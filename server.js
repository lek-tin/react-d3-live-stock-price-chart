'use strict';

// Configuration
const UPDATE_INTERVAL = 500;
const PRETTY_JSON = true;
const PORT = process.env.PORT || 4000;

// Modules
const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

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

const quoteList = [ 'SIRI',
                    'CSCO',
                    'FB',
                    'BABA',
                    'MSFT',
                    'ATVI',
                    'MU',
                    'INTC',
                    'QQQ',
                    'FTR' 
                    ];
const prv_closed_price_array = [ 
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3),
                                _.round(_.random(10, 100, true), 3)   ];

// Sockets
io.sockets.on('connection', function(socket) {

    // trackQuote(socket, quoteList);
    trackQuotes(socket);

    console.log("Socket connected");

});

console.log('Server is running at "http://localhost:%s"', PORT);

function trackQuotes(socket) {
    pushQuotes(socket); 
    // every UPDATE_INTERVAL milliseconds
    let timer = setInterval(function() {
        pushQuotes(socket);
    }, UPDATE_INTERVAL);

    socket.on('disconnect', function() {
        clearInterval(timer);
        console.log("Socket diconnected");
    });
}

function _getChange(curr, base) {
    const result = (curr-base)*100/base;
    return result;
}

function pushQuotes(socket) {
    let obj = {};
    let timestamp = new Date();
    timestamp = ("0" + timestamp.getHours()).slice(-2)   + ":" + 
                ("0" + timestamp.getMinutes()).slice(-2) + ":" + 
                ("0" + timestamp.getSeconds()).slice(-2);
    console.log('timestamp:', timestamp);
    const priceArray = [
        _.round(_.random(prv_closed_price_array[0]*0.5, prv_closed_price_array[0]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[1]*0.5, prv_closed_price_array[1]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[2]*0.5, prv_closed_price_array[2]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[3]*0.5, prv_closed_price_array[3]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[4]*0.5, prv_closed_price_array[4]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[5]*0.5, prv_closed_price_array[5]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[6]*0.5, prv_closed_price_array[6]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[7]*0.5, prv_closed_price_array[7]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[8]*0.5, prv_closed_price_array[8]*1.5, true), 3),
        _.round(_.random(prv_closed_price_array[9]*0.5, prv_closed_price_array[9]*1.5, true), 3)
    ];
    obj.timestamp = timestamp;
    obj.quotes = [
        {
            index: 0,
            symbol: quoteList[0],
            price: priceArray[0],
            change_percent: _getChange(priceArray[0], prv_closed_price_array[0]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[0] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[0] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[0]
        },
        {
            index: 1,
            symbol: quoteList[1],
            price: priceArray[1],
            change_percent: _getChange(priceArray[1], prv_closed_price_array[1]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[1] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[1] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[1]
        },
        {
            index: 2,
            symbol: quoteList[2],
            price: priceArray[2],
            change_percent: _getChange(priceArray[2], prv_closed_price_array[2]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[2] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[2] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[2]
        },
        {
            index: 3,
            symbol: quoteList[3],
            price: priceArray[3],
            change_percent: _getChange(priceArray[3], prv_closed_price_array[3]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[0] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[3] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[3]
        },
        {
            index: 4,
            symbol: quoteList[4],
            price: priceArray[4],
            change_percent: _getChange(priceArray[4], prv_closed_price_array[4]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[4] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[4] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[4]
        },
        {
            index: 5,
            symbol: quoteList[5],
            price: priceArray[5],
            change_percent: _getChange(priceArray[5], prv_closed_price_array[5]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[5] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[5] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[5]
        },
        {
            index: 6,
            symbol: quoteList[6],
            price: priceArray[6],
            change_percent: _getChange(priceArray[6], prv_closed_price_array[6]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[6] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[6] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[6]
        },
        {
            index: 7,
            symbol: quoteList[7],
            price: priceArray[7],
            change_percent: _getChange(priceArray[7], prv_closed_price_array[7]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[7] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[7] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[7]
        },
        {
            index: 8,
            symbol: quoteList[8],
            price: priceArray[8],
            change_percent: _getChange(priceArray[8], prv_closed_price_array[8]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[8] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[8] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[8]
        },
        {
            index: 9,
            symbol: quoteList[9],
            price: priceArray[9],
            change_percent: _getChange(priceArray[9], prv_closed_price_array[9]),
            last_trade_time: timestamp,
            bid_size: _.random(30000, 70000, false),
            bid: _.round(priceArray[9] - 0.5, 2),
            ask_size: _.random(30000, 70000, false),
            ask: _.round(priceArray[9] + 0.5, 2),
            prv_closed_price: prv_closed_price_array[9]
        },
    ]
    socket.emit('updateQuotes', PRETTY_JSON ? JSON.stringify(obj, null, 4) : JSON.stringify(obj));
}



