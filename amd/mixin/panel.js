/** @jsx react.DOM */

define(['react', 'affine/lib/2d/primitive', '../header/icon/index', '../Slot', './storeItemExclusions', './drag'], function (
         react,   affine,                              icon,            Slot,     storeItemExclusions,     drag) {

    var Close = icon.Close;
    var Unmount = icon.Unmount;
    var Fork = icon.Fork;

    /**
     * Externally supplied state:
     * icons : [{url: 'http://asdf.com', mouseDown: function (e) {...}}, ...]
     */
    return {
        mixins : [storeItemExclusions, drag],

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

        baseMemento : function () {
            // Record props and state needed for the panel to get inserted into
            // a Group.  Exclude `storeItemExclusions`.  Exclude dimensional
            // stuff needed for drag positioning--any drag-only requirements.
            // The default drag props implies that `isMounted` can be excluded.

            var m = {};
            var chrome = ['headerPolicy', 'contentPolicy', 'footerPolicy'];
            var headerActions = ['unmountPolicy', 'forkPolicy', 'closePolicy'];
            for (var key in chrome.concat(headerActions)) {
                if (this.props[key]) { m[key] = this.props[key]; }
            }

            return m;
        },

        defaultUnmount : function () {
            if (!this.props.isMounted) return;

            this.defaultFork();
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        defaultFork : function () {
            var props = this.memento();
            props.isMounted = false;

            if (this.props.isMounted) {
                var element = this.getDOMNode();
                var rect = element.getBoundingClientRect();
                props.initialLeft = rect.left;
                props.initialTop = rect.top;
                props.initialWidth = element.offsetWidth;
                props.initialHeight = element.offsetHeight;
            } else {
                props.initialLeft = this.state.position.x;
                props.initialTop = this.state.position.y;
                props.initialWidth = this.state.size.x;
                props.initialHeight = this.state.size.y;
            }

            this.props.orphansAct.install.push(this.type.bundle(props));
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

            var headerCursor = {};
            if (!this.props.isMounted) { headerCursor.cursor = 'move'; }

            var cursor = { cursor : 'default' };

            var mouseDown = function (e) {
                this.dragMouseDown(e);
                this.bindOrphan(e);
            };

            array.push(
                react.DOM.header(
                    {style:headerCursor,
                    className:"title-bar",
                    onMouseDown:mouseDown.bind(this)}, 
                  react.DOM.div(null, 
                    Unmount( {style:cursor, className:"icon", onMouseDown:unmount} ),
                    Fork( {style:cursor, className:"icon", onMouseDown:fork} ),
                    Close( {style:cursor, className:"icon", onMouseDown:close} )
                  ),
                  react.DOM.p( {style:headerCursor}, this.state.title)
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
                          onMouseDown:icon.mouseDown} )
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

        bindOrphan : function (e) {
            if (!this.props.isMounted) {
                this.props.orphansAct.adoption.select(this.props.key);
            }
        },

        unbindOrphan : function (e) {
            if (!this.props.isMounted) {
                this.props.orphansAct.adoption.unselect();
            }
        },

        componentDidUpdate : function (prevProps, prevState) {
            if (!this.props.isMounted && prevProps.isMounted) {
                document.addEventListener('mouseup', this.unbindOrphan);
            } else if (this.props.isMounted && !prevProps.isMounted) {
                document.removeEventListener('mouseup', this.unbindOrphan);
            }
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
            if (!this.props.isMounted) {
                style.position = 'absolute';
                style.padding = 0;
                style.margin = 0;
                style.zIndex = 100;
                style.left = this.state.position.x;
                style.top = this.state.position.y;
                style.width = this.state.size.x;
                style.height = this.state.size.y;

                if (this.isDragging()) {
                    style.pointerEvents = 'none';
                }

                if (this.props.isVisiting) {
                    style.display = 'none';
                }
            }

            if (this.props.isMounted) {
                children = (
                    Slot(
                        {isPlaceholder:false,
                        panelsAct:this.props.panelsAct,
                        orphansAct:this.props.orphansAct}, 
                      children
                    )
                );
            }

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
