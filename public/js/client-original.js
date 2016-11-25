'use strict';

$(document).ready(function() {
    var ticker = location.hash.substr(1);
    // console.log(location.hash.substr(1));
    // var ticker = 'APPL';
    var socket = io.connect('http://localhost:4000'); // jshint ignore:line
    socket.emit('ticker', ticker);
    socket.on(ticker, function(response) {
        var data = $('<pre>' + response + '</pre><hr />');
        $('#quotes').append(data);
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 100);
        $(data).show('slide', {
            direction: 'up'
        }, 300);
        $(data).effect('highlight', {}, 1500);
        console.log(response);
    });

    $(window).on('hashchange', function() {
        var ticker = location.hash.substr(1);
        // var ticker = 'APPL';
        socket.emit('ticker', ticker);
    });
});


var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 130, 340, 200, 500, 250, 350]
        ]
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
});

setTimeout(function () {
    chart.load({
        columns: [
            ['data3', 400, 500, 450, 700, 600, 500],
            ['data4', 300, 20, 90, 300, 850, 150]
        ]
    });
}, 1000);

const quoteList = [ "AAL",
                    "AAPL",
                    "ADBE",
                    "ADI",
                    "ADP",
                    "ADSK",
                    "AKAM",
                    "ALXN",
                    "AMAT",
                    "AMGN",
                    "AMZN",
                    "ATVI",
                    "AVGO",
                    "BBBY",
                    "BIDU",
                    "BIIB",
                    "BMRN",
                    "CA",
                    "CELG",
                    "CERN",
                    "CHKP",
                    "CHTR",
                    "CMCSA",
                    "COST",
                    "CSCO",
                    "CSX",
                    "CTRP",
                    "CTSH",
                    "CTXS",
                    "DISCA",
                    "DISCK",
                    "DISH",
                    "DLTR",
                    "EA",
                    "EBAY",
                    "ESRX",
                    "EXPE",
                    "FAST",
                    "FB",
                    "FISV",
                    "FOX",
                    "FOXA",
                    "GILD",
                    "GOOG",
                    "GOOGL",
                    "HSIC",
                    "ILMN",
                    "INCY",
                    "INTC",
                    "INTU",
                    "ISRG",
                    "JD",
                    "KHC",
                    "LBTYA",
                    "LBTYK",
                    "LLTC",
                    "LRCX",
                    "LVNTA",
                    "MAR",
                    "MAT",
                    "MCHP",
                    "MDLZ",
                    "MNST",
                    "MSFT",
                    "MU",
                    "MXIM",
                    "MYL",
                    "NCLH",
                    "NFLX",
                    "NTAP",
                    "NTES",
                    "NVDA",
                    "NXPI",
                    "ORLY",
                    "PAYX",
                    "PCAR",
                    "PCLN",
                    "PYPL",
                    "QCOM",
                    "QVCA",
                    "REGN",
                    "ROST",
                    "SBAC",
                    "SBUX",
                    "SIRI",
                    "SRCL",
                    "STX",
                    "SWKS",
                    "SYMC",
                    "TMUS",
                    "TRIP",
                    "TSCO",
                    "TSLA",
                    "TXN",
                    "ULTA",
                    "VIAB",
                    "VOD",
                    "VRSK",
                    "VRTX",
                    "WBA",
                    "WDC",
                    "WFM",
                    "XLNX",
                    "YHOO",
                    "XRAY" ];

console.dir(quoteList);



