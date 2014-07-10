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

        statics : {
            storeItem : function (props) { return {
                cls : this,
                props : props
            }; },
        },

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
                m[key] = this.props[key];
            }

            return m;
        },

        defaultUnmount : function () {
            this.fork();
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
                <header className="title-bar">
                  <div onMouseDown={this.draggableMouseDown}>
                    <Unmount className="icon" onClick={unmount} />
                    <Fork className="icon" onClick={fork} />
                    <Close className="icon" onClick={close} />
                  </div>
                  <p>{this.state.title}</p>
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

            return (
                <li key={this.props.key} className={classes.join(' ')}>
                    {children}
                </li>
            );
        }
    };
});
