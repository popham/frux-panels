/** @jsx react.DOM */

var react = require('react');
var host = require('../mixin/host');
var fork = require('./fork');
var close = require('./close');
var Header = require('./Header');

    module.exports = react.createClass({
        displayName : 'Static',

        mixins : [host],

        propTypes : {
            heading : react.PropTypes.string.isRequired
        },

        unmount : function (e) {
            this.fork(e);
            this.props.panelsAct.uninstall(this.props.key);

            e.stopPropagation();
            e.preventDefault();
        },

        render : function () {
            return (
                react.DOM.li( {key:this.props.key,
                    className:"mount static-mount"}, 
                  Header(
                      {onUnmount:this.unmount,
                      onFork:fork,
                      onClose:close}, 
                    this.props.heading
                  ),
                  this.props.children
                )
            );
        }
    });

