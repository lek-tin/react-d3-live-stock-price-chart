import React from "react";
import io from "socket.io-client";
import _ from "lodash";
import d3 from "d3";
import c3 from "c3";

import SingleRecord from "./SingleRecord";

const APP = React.createClass({

    getInitialState: function() {
        return {
            valueArray: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],
            dataArray: [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
            ],
            timeseries: [],
            quoteList: ['SIRI',
                        'CSCO',
                        'FB',
                        'BABA',
                        'MSFT',
                        'ATVI',
                        'MU',
                        'INTC',
                        'QQQ',
                        'FTR'
                        ],
            checkArray: [true, true, true, true, true, false, false, false, false, false],
            legendColors: [ "#288FB4",
                            "#FA360A",
                            "#6BC369",
                            "#F8DA5B",
                            "#C3FF00",
                            "#BF383F",
                            "#1D556F",
                            "#00FFCE",
                            "#C3FF00", 
                            "#FF0055" ]
        };
    },
    componentWillMount() {
        this.socket = io('http://localhost:4000');    
        this.socket.on('connect', this._connect);
        this.socket.on('disconnect', this._disconnect);
        this.socket.on('updateQuotes', this._updateQuotes);
        let colorPairs = {};
        const self = this;
        this.state.quoteList.map(function(val, i) {
            colorPairs[val] = self.state.legendColors[i]; 
        });
        // $('tr.flash').addClass('flash');
        this.setState({ colorPairs: colorPairs });
    },

    componentDidMount() {
        const checkArray = this.state.checkArray;
        this._updateChart(checkArray);
    },

    componentDidUpdate: function(prevProps, prevState) {
        const checkArray = this.state.checkArray;
        this._updateChart(checkArray);
    },

    _updateQuotes(obj) {
        let valueArray = this.state.valueArray;
        let dataArray = this.state.dataArray;
        let timeseries = this.state.timeseries;
        let object = JSON.parse(obj);
        const timestamp = object.timestamp;
        const quotes = object.quotes;
        timeseries.push(timestamp);
        dataArray = quotes;
        // console.log(timeseries);
        // console.log('quotes from backend:', dataArray);
        dataArray.map(function(val, i) {
            // console.log(val);
            // console.log('index: ', i);
            valueArray[i].push(val.price);
            // console.log(valueArray);
        });
        this.setState({ valueArray: valueArray, dataArray: dataArray });
    },

    _updateChart(checkArray) {
        const self = this;
        let dataToFeed = [];
        const timeseries = _.concat('x', self.state.timeseries);
        dataToFeed[0] = timeseries;
        checkArray.map(function(val, i) {
            // console.log('value array: ', self.state.valueArray);
            if(val) {
                // console.log('Single record: ', _.concat(self.state.quoteList[i], self.state.valueArray[i]));
                dataToFeed.push(_.concat(self.state.quoteList[i], self.state.valueArray[i]));  
                // console.log('Data to feed (on check): ', dataToFeed);
            }
        });

        if (!self.chart) {
            self.chart = c3.generate({
                bindTo: '#chart',
                data: {
                    x: 'x',
                    xFormat: '%H:%M:%S', // 'xFormat' can be used as custom format of 'x'
                    columns: dataToFeed,
                    colors: {
                        pattern: self.state.colorPairs
                    }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H:%M:%S'
                        }
                    }
                }
            });
        } else {
            self.chart.load({
                unload: true,
                columns: dataToFeed
            });
        }
        
    },

    _selectQuote(key) {
        const newKey = parseInt(key, 10);
        let checkArray = this.state.checkArray;
        checkArray[newKey] = !checkArray[newKey];
    },

    _connect() {
        const self = this;
        console.log("Connected: " + this.socket.id);
    },

    _disconnect() {
        console.log("Disconnected: " + this.socket.id);
    },

    _eachRecord(val, i, self) {
        return (
            <SingleRecord selectQuote={self._selectQuote} 
                          key={i} {...self.state.dataArray[i]}
                          legendColor={self.state.legendColors[i]} 
                          checkStatus={self.state.checkArray[i]} />
        )
    },

	render() {
        const self = this;
		return (
			<table class="table-responsive centered bordered">
				<thead>
					<tr>
						<th label="id">Show</th>
						<th label="legend">Legend</th>
                        <th label="symbol">Symbol</th>
                        <th ref="prvClsosedPrice">Previous Closed Price</th>
                        <th label="price">Price</th>
                        <th label="updated">Updated</th>
                        <th label="change">Change</th>
                        <th label="bid size">Bid Size</th>
                        <th label="bid">Bid</th>
                        <th label="ask">Ask</th>
                        <th label="ask size">Ask Size</th>
					</tr>
				</thead>
				<tbody>
                    {
                        this.state.quoteList.map(function(val, i) {
                            return self._eachRecord(val, i, self);
                        })
                    }
                </tbody>
			</table>
		)
	}

});

export default APP;