/** @jsx react.DOM */

define(['react', '../header/icon/index', './groupMember'], function (
         react,             icon,           groupMember) {

    var Close = icon.Close;
    var Unmount = icon.Unmount;
    var Fork = icon.Fork;

    /**
     * Externally supplied state:
     * icons : [{url: 'http://asdf.com', onClick: function (e) {...}}, ...]
     */
    return {
        mixins : [groupMember],

        propTypes : {
            headerPolicy : react.PropTypes.func,
            contentPolicy : react.PropTypes.func,
            footerPolicy : react.PropTypes.func
        },

        getInitialState : function () { return {
            isMounted : true
        }; },

        className : function () {
            var cls = ['panel'];
            cls.push(this.state.isMounted ? 'mounted' : 'unmounted');

            return cls.join(' ');
        },

        defaultHeader : function(array) {
            array.push(
                <header className="title-bar">
                  <div>
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

            return (
                <li key={this.props.key} className={this.className()}>
                    {children}
                </li>
            );
        }
    };
});
