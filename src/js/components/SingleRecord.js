import React from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from "lodash";

const SingleRecord = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        this.toUpdate = false;
        if (this.props.price === nextProps.price) {
            return false;
        } else {
            this.toUpdate = true;
            return true;
        }
    },

    _handleCheck() {
        this.props.selectQuote(this.props.index);
    },

    render() {
        const legendColor = {
            backgroundColor: this.props.legendColor
        };

        return(
            <ReactCSSTransitionGroup
                transitionName="flash"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                component='tr' key={this.props.index}>
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
            </ReactCSSTransitionGroup>
        )
    }

});

export default SingleRecord;