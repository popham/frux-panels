/** @jsx react.DOM */

var react = require('react');
var icon = require('./icon/index');

    var Unmount = icon.Unmount;
    var Fork = icon.Fork;
    var Close = icon.Close;

    module.exports = react.createClass({
        displayName : 'Header',

        propTypes : {
            onUnmount : react.PropTypes.func.isRequired,
            onFork : react.PropTypes.func.isRequired,
            onClose : react.PropTypes.func.isRequired
        },

        render : function () {
            var moveCursor = { cursor : "move" };
            var cursor = { cursor : "default" };

            return (
                react.DOM.header(
                    {style:moveCursor,
                    className:"title-bar"}, 
                  react.DOM.div(null, 
                    Unmount(
                        {style:cursor,
                        className:"icon",
                        onMouseDown:this.props.onUnmount} ),
                    Fork(
                        {style:cursor,
                        className:"icon",
                        onMouseDown:this.props.onFork} ),
                    Close(
                        {style:cursor,
                        className:"icon",
                        onMouseDown:this.props.onClose} )
                  ),
                  react.DOM.p( {style:moveCursor}, this.props.children)
                )
            );
        }
    });

