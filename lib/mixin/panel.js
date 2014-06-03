/** @jsx react.DOM */

var react = require('react');
var DragBus = require('../DragBus');

/**
 * Externally supplied state:
 * icons : [{url: 'http://asdf.com', onClick: function (e) {...}}, ...]
 */
module.exports = {
    propTypes : {
        panels : react.PropTypes.instanceOf(List).isRequired,
        position : react.PropTypes.number.isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus)
    },

    appendHeader : function (array) {
        if (this.state.title === undefined) { return array; }
        array.push(react.DOM.header(null, this.state.title));

        return array;
    },

    appendFooter : function (array) {
        var iconify = function (icon) {
            return (
                react.DOM.li(null, 
                    react.DOM.img( {height:this.state.iconHeight,
                         width:this.state.iconWidth,
                         url:icon.url,
                         onClick:icon.onClick} )
                )
            );
        }.bind(this);

        // Easy to get the thing on the screen, but should this be under the
        // header?
        var icons = this.state.icons;
        if (this.state.uninstallIcon){
            icons = icons.concat([this.state.uninstallIcon]);
        }

        array.push(react.DOM.footer(null, react.DOM.ul(null, icons.map(iconify, this))));

        return array;
    },

    render : function () {
        var children = [];

        this.appendHeader(children);

        if (this.content) {
            children.push(this.content());
        }

        this.appendFooter(children);

        return react.DOM.section(null, children);
    }
};
