/** @jsx react.DOM */

define(['react', 'affine/lib/2d/primitive', '../header/icon/index', './storeItemExclusions', './draggable'], function (
         react,   affine,                              icon,           storeItemExclusions,     draggable) {

    var Close = icon.Close;
    var Unmount = icon.Unmount;
    var Fork = icon.Fork;

    /**
     * Externally supplied state:
     * icons : [{url: 'http://asdf.com', onClick: function (e) {...}}, ...]
     */
    return {
        mixins : [storeItemExclusions, draggable],

        propTypes : {
            headerPolicy : react.PropTypes.func,
            contentPolicy : react.PropTypes.func,
            footerPolicy : react.PropTypes.func,
            unmountPolicy : react.PropTypes.func,
            forkPolicy : react.PropTypes.func,
            closePolicy : react.PropTypes.func
        },

        // Allow other mixins to override policies by leaving `getDefaultProps`
        // unspec'd.

        clientPosition : function () {
            var rect = this.getDOMNode().getBoundingClientRect();
            return new affine.Point(rect.left, rect.top);
        },

        baseMemento : function () {
            // Exclude `draggable` and `storeItemExclusions` mixin props and
            // state.  Mount and unmount methods are responsible for setting
            // this stuff.

            var m = {};
            var chrome = ['headerPolicy', 'contentPolicy', 'footerPolicy'];
            var headerActions = ['unmountPolicy', 'forkPolicy', 'closePolicy'];
            for (var key in chrome.concat(headerActions)) {
                if (this.props[key]) { m[key] = this.props[key]; }
            }

            return m;
        },

        defaultUnmount : function () {
            this.defaultFork();
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        defaultFork : function () {
            if (!this.props.isMounted) return;

            var props = this.memento();
            props.isMounted = false;

            var p = this.clientPosition();
            props.initialLeft = p.x;
            props.initialTop = p.y;

            this.props.orphansAct.install.push(this.type.storeItem(props));
        },

        defaultClose : function () {
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        defaultHeader : function(array) {
            var unmount = this.defaultUnmount;
            if (this.props.unmountPolicy) { unmount = this.props.unmountPolicy; }

            var fork = this.defaultFork;
            if (this.props.forkPolicy) { fork = this.props.forkPolicy; }

            var close = this.defaultClose;
            if (this.props.closePolicy) { close = this.props.closePolicy; }

            array.push(
                react.DOM.header( {className:"title-bar"}, 
                  react.DOM.div( {onMouseDown:this.draggableMouseDown}, 
                    Unmount( {className:"icon", onClick:unmount} ),
                    Fork( {className:"icon", onClick:fork} ),
                    Close( {className:"icon", onClick:close} )
                  ),
                  react.DOM.p(null, this.state.title)
                )
            );

            return array;
        },

        defaultContent : function (array) {
            if (this.content) {
                array.push(react.DOM.div( {className:"content"} ));
            }

            return array;
        },

        defaultFooter : function (array) {
            function iconify(icon) {
                return (
                    react.DOM.li(null, 
                      react.DOM.img( {height:this.state.iconHeight,
                          width:this.state.iconWidth,
                          src:icon.url,
                          onClick:icon.onClick} )
                    )
                );
            }

            if (this.state.icons.length > 0) {
                array.push(
                    react.DOM.footer( {className:"iconic-triggers"}, 
                      react.DOM.ul(null, 
                          this.state.icons.map(iconify.bind(this))
                      )
                    )
                );
            }

            return array;
        },

        render : function () {
            var children = [];

            var header = this.defaultHeader;
            if (this.props.headerPolicy) { header = this.props.headerPolicy; }

            var content = this.defaultContent;
            if (this.props.contentPolicy) { content = this.props.contentPolicy; }

            var footer = this.defaultFooter;
            if (this.props.footerPolicy) { footer = this.props.footerPolicy; }

            header(children);
            content(children);
            footer(children);

            var classes = ['panel', this.props.isMounted ? 'mounted' : 'unmounted'];
            var style = {};
            if (!this.props.isMounted) { style.position = 'absolute'; }

            return (
                react.DOM.li( {key:this.props.key,
                    style:style,
                    className:classes.join(' ')}, 
                  children
                )
            );
        }
    };
});
