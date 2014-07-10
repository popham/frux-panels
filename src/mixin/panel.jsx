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
            } else {
                props.initialLeft = this.state.left;
                props.initialTop = this.state.top;
                props.initialWidth = this.state.width;
            }

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

            var headerCursor = {};
            if (!this.props.isMounted) { headerCursor.cursor = 'move'; }

            var cursor = { cursor : 'default' };

            array.push(
                <header
                    style={headerCursor}
                    className="title-bar"
                    onMouseDown={this.draggableMouseDown}>
                  <div>
                    <Unmount style={cursor} className="icon" onClick={unmount} />
                    <Fork style={cursor} className="icon" onClick={fork} />
                    <Close style={cursor} className="icon" onClick={close} />
                  </div>
                  <p style={headerCursor}>{this.state.title}</p>
                </header>
            );

            return array;
        },

        defaultContent : function (array) {
            if (this.content) {
                array.push(<div className="content" />);
            }

            return array;
        },

        defaultFooter : function (array) {
            function iconify(icon) {
                return (
                    <li>
                      <img height={this.state.iconHeight}
                          width={this.state.iconWidth}
                          src={icon.url}
                          onClick={icon.onClick} />
                    </li>
                );
            }

            if (this.state.icons.length > 0) {
                array.push(
                    <footer className="iconic-triggers">
                      <ul>
                          {this.state.icons.map(iconify.bind(this))}
                      </ul>
                    </footer>
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
            if (!this.props.isMounted) {
                style.position = 'absolute';
                style.padding = 0;
                style.margin = 0;
                style.zIndex = 100;
                style.left = this.state.left;
                style.top = this.state.top;
                style.width = this.state.width;
            }

            return (
                <li key={this.props.key}
                    style={style}
                    className={classes.join(' ')}>
                  {children}
                </li>
            );
        }
    };
});
