'use strict';

// Configuration
const UPDATE_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

// Modules
const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const path = require('path');

// App
const app = express();
app.use(express.static('./public'));
app.use(cors());

// Start server at port 4000
const server = app.listen(PORT);
const io = require('socket.io').listen(server);
io.set('origins', '*:*');

// Routing
app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'public') + '/index.html');
});

// Sockets
io.sockets.on('connection', function(socket) {
    socket.on('ticker', function(ticker) {
        trackTicker(socket, ticker);
    });
});

// get quote prices real-time
function getQuote(socket, ticker) {
    https.get({
        port: 443,
        method: 'GET',
        hostname: 'www.google.com',
        path: '/finance/info?client=ig&q=' + ticker,
        timeout: 1000
    }, function(response) {

        response.setEncoding('utf8');
        
        // console.dir(response);
        
        let data = '';

        response.on('data', function(chunk) {
            data += chunk;
        });

        response.on('end', function() {
            if(data.length > 0) {
                let dataObj;

                try {
                    dataObj = JSON.parse(data.substring(3));
                } catch(e) {
                    return false;
                }

                let quote = {};
                quote.ticker = dataObj[0].t;
                quote.exchange = dataObj[0].e;
                quote.price = dataObj[0].l_cur; // jshint ignore:line
                quote.change = dataObj[0].c;
                quote.change_percent = dataObj[0].cp; // jshint ignore:line
                quote.last_trade_time = dataObj[0].lt; // jshint ignore:line
                quote.dividend = dataObj[0].div;
                quote.yield = dataObj[0].yld;

                // console.dir(dataObj[0]);

                const obj = {
                    id: '304466804484872',
                    t: 'GOOG',
                    e: 'NASDAQ',
                    l: '768.91',
                    l_fix: '768.91',
                    l_cur: '768.90',
                    s: '0',
                    ltt: '2:20PM EST',
                    lt: 'Nov 22, 2:20PM EST',
                    lt_dts: '2016-11-22T14:20:12Z',
                    c: '-0.29',
                    c_fix: '-0.29',
                    cp: '-0.04',
                    cp_fix: '-0.04',
                    ccol: 'chr',
                    pcls_fix: '769.2'
                }

                socket.emit(ticker, true ? JSON.stringify(quote, null, 4) : JSON.stringify(quote));
            }
        });
    });
}

// Track single quote
function trackTicker(socket, ticker) {
    // run the first time immediately
    getQuote(socket, ticker);

    // every UPDATE_INTERVAL milliseconds
    let timer = setInterval(function() {
        getQuote(socket, ticker);
    }, UPDATE_INTERVAL);

    socket.on('disconnect', function () {
        clearInterval(timer);
    });
}



