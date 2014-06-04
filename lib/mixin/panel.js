/** @jsx react.DOM */

var react = require('react');
var DragBus = require('../DragBus');
var Insertion = require('../Insertion');

/**
 * Default policies
 */
function headerUninstaller(array) {
    array.push(
        react.DOM.header(null, 
            react.DOM.div(null, 
                react.DOM.img( {url:this.props.uninstallUrl, onClick:this.uninstall} )
            ),
            react.DOM.p(null, this.state.title)
        )
    );

    return array;
}

function contentTemplateMethod(array) {
    if (this.content) {
        array.push(this.content());
    }

    return array;
}

function footerIconicTriggers(array) {
    function iconify(icon) {
        return (
            react.DOM.li(null, 
                react.DOM.img( {height:this.state.iconHeight,
                     width:this.state.iconWidth,
                     url:icon.url,
                     onClick:icon.onClick} )
            )
        );
    }

    if (this.state.icons.length > 0) {
        array.push(
            react.DOM.footer(null, 
                react.DOM.ul(null, icons.map(iconify.bind(this)))
            )
        );
    }

    return array;
}

/**
 * Externally supplied state:
 * icons : [{url: 'http://asdf.com', onClick: function (e) {...}}, ...]
 */
module.exports = {
    propTypes : {
        panels : react.PropTypes.instanceOf(List).isRequired,
        position : react.PropTypes.number.isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus),

        headerPolicy : react.PropTypes.func,
        contentPolicy : react.PropTypes.func,
        footerPolicy : react.PropTypes.func,
        uninstallUrl : react.PropTypes.string
    },

    getDefaultProps : function () { return {
        headerPolicy : headerUninstaller.bind(this),
        contentPolicy : contentTemplateMethod.bind(this),
        footerPolicy : footerIconicTriggers.bind(this)
    }; },

    getInitialState : function () { return {
        title : ''
    }; },

    uninstall : function () {
        var i = this.props.position;
        if (i === 0 || i === this.panels.items.length-1) {
            this.panels.act.remove(i);
            return;
        }

        var pre = this.panels.items[i-1];
        var post = this.panels.items[i+1];
        if (pre.cls === Insertion && post.cls === Insertion) {
            // Use the trailing insertion point for the primary metadata.
            // Insertion bumped this point, so restore it so that a quick
            // (insert, remove) yields an identity operation,.
            pre = Insertion.join(post, pre);

            this.panels.act.remove(i+1);
            this.panels.act.remove(i);
            this.panels.act.remove(i-1);

            this.panels.act.insert(pre, i-1);
        } else {
            this.panels.act.remove(i);
        }
    },

    render : function () {
        var children = [];

        this.headerPolicy(children);
        this.contentPolicy(children);
        this.footerPolicy(children);

        return react.DOM.section(null, children);
    }
};
