/** @jsx react.DOM */

var react = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
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
        array.push(<header>{this.state.title}</header>);

        return array;
    },

    appendFooter : function (array) {
        function iconify(icon) {
            return (
                <li>
                    <img height={this.state.iconHeight}
                         width={this.state.iconWidth}
                         url={icon.url}
                         onClick={icon.onClick} />
                </li>
            );
        }.bind(this)

        // Easy to get the thing on the screen, but should this be under the
        // header?
        if (this.state.uninstallIcon){
            var icons = this.state.icons.concat([this.state.uninstallIcon]);
        }

        array.push(<footer><ul>{icons.map(iconify, this)}</ul></footer>);

        return array;
    },

    render : function () {
        var children = [];

        this.appendHeader(children);

        if (this.content) {
            children.push(this.content());
        }

        this.appendFooter(children);

        return <section>{children}</section>;
    }
};
