/** @jsx react.DOM */

define(['react', 'affine/lib/2d/primitive', '../header/icon/index', './groupMember'], function (
         react,   affine,                              icon,           groupMember) {

    var Close = icon.Close;
    var Unmount = icon.Unmount;
    var Fork = icon.Fork;

    /**
     * Externally supplied state:
     * icons : [{url: 'http://asdf.com', onClick: function (e) {...}}, ...]
     */
    return {
        mixins : [groupMember, draggable],

        propTypes : {
            headerPolicy : react.PropTypes.func,
            contentPolicy : react.PropTypes.func,
            footerPolicy : react.PropTypes.func
        },

        // Allow other mixins to override policies by leaving `getDefaultProps`
        // unspec'd.

        absolutePosition : function () {
            var rect = this.getDOMNode().getBoundingClientRect();
            return new affine.Point(rect.left, rect.top);
        },

        baseMemento : function () {
            var m = {};
            for (var key in ['headerPolicy', 'contentPolicy', 'footerPolicy']) {
                m[key] = this.props[key];
            }

            return m;
        },

        defaultHeader : function(array) {
            array.push(
                <header className="title-bar">
                  <div onMouseDown={this.draggableMouseDown}>
                    <Unmount className="icon" onClick={this.unmount} />
                    <Fork className="icon" onClick={this.fork} />
                    <Close className="icon" onClick={this.close} />
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

        remove : function () {
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        render : function () {
            var children = [];

            var header = this.defaultHeader;
            if (this.props.headerPolicy) { header = this.props.headerPolicy; }

            var content = this.defaultContent;
            if (this.props.contentPolicy) { content = this.props.contentPolicy; }

            var footer = this.defaultFooter;
            if (this.props.footerPolicy) { footer = this.props.footerPolicy; }

            header.bind(this)(children);
            content.bind(this)(children);
            footer.bind(this)(children);

            var classes = ['panel', this.props.isMounted ? 'mounted' : 'unmounted'];

            return (
                <li key={this.props.key} className={classes.join(' ')}>
                    {children}
                </li>
            );
        }
    };
});
