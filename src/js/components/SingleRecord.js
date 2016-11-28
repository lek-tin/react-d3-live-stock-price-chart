import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

const SingleRecord = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.price === nextProps.price) return false;
        return true;
    },

    componentDidMount: function(prevProps, prevState) {
        const table_row = ReactDOM.findDOMNode(this.refs.table_row);
        table_row.className = 'flash';
        console.log('component did mount(FIRST) -> class name: ', table_row.className);
        setTimeout(function() {
            table_row.className = '';
            console.log('component did mount (SECOND)-> class name: ', table_row.className);
        }, 300);
    },

    componentDidUpdate: function(prevProps, prevState) {
        const table_row = ReactDOM.findDOMNode(this.refs.table_row);
        table_row.className = 'flash';
        console.log('component did mount(FIRST) -> class name: ', table_row.className);
        setTimeout(function() {
            table_row.className = '';
            console.log('component did mount (SECOND)-> class name: ', table_row.className);
        }, 300);
    },

    _handleCheck() {
        this.props.selectQuote(this.props.index);
    },

    render() {
        const legendColor = {
            backgroundColor: this.props.legendColor
        };

        return(
            <tr ref='table_row' class='flash' key={this.props.index}>
                <td ref="show">
                    <input type="checkbox" checked={this.props.checkStatus} onChange={this._handleCheck} />
                </td>
                <td ref='legend'>
                    <span class={ this.props.checkStatus ? 'legend' : 'legend hide' } style={legendColor}></span>
                </td>
                <td ref="symbol">{this.props.symbol}</td>
                <td ref="prvClsosedPrice">{this.props.prv_closed_price}</td>
                <td ref="price">{this.props.price}</td>
                <td ref="last_trade_time">{this.props.last_trade_time}</td>
                <td ref="change" class={this.props.change_percent > 0 ? 'increase' : 'drop' }>{_.concat(_.round(this.props.change_percent, 2), '%')}</td>
                <td ref="bidSize">{this.props.bid_size}</td>
                <td ref="bid">{this.props.bid}</td>
                <td ref="ask">{this.props.ask}</td>
                <td ref="askSize">{this.props.ask_size}</td>
            </tr>
        )
    }

});

export default SingleRecord;



