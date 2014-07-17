/** @jsx react.DOM */

var react = require('react');
var host = require('../mixin/host');
var fork = require('./fork');
var close = require('./close');
var Buttons = require('./Buttons');

    module.exports = react.createClass({
        displayName : 'Static',

        mixins : [host],

        propTypes : {
            heading : react.PropTypes.string.isRequired
        },

        unmount : function (e) {
            fork.bind(this)(e);
            this.props.panelsAct.uninstall(this.props.key);

            e.stopPropagation();
            e.preventDefault();
        },

        render : function () {
            return (
                react.DOM.li( {key:this.props.key,
                    className:"mount static-mount"}, 
                  react.DOM.header( {className:"title-bar"}, 
                    Buttons(
                        {onUnmount:this.unmount,
                        onFork:fork.bind(this),
                        onClose:close.bind(this)} ),
                    react.DOM.p(null, this.props.heading)
                  ),
                  react.Children.only(this.props.children)
                )
            );
        }
    });

