/** @jsx react.DOM */

define(['react', './groupMember'], function (
         react,     groupMember) {
    /**
     * Default policies
     */
    function headerUninstaller(array) {
        array.push(
            <header>
                <div>
                    <span className="glyphicon glyphicon-remove"
                          onClick={this.uninstallHandler} />
                </div>
                <p>{this.state.title}</p>
            </header>
        );

        return array;
    }

    function contentTemplateMethod(array) {
        if (this.content) {
            array.push(
                <div>this.content()</div>
            );
        }

        return array;
    }

    function footerIconicTriggers(array) {
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
                <footer>
                    <ul>{this.state.icons.map(iconify.bind(this))}</ul>
                </footer>
            );
        }

        return array;
    }

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

        getDefaultProps : function () { return {
            headerPolicy : headerUninstaller,
            contentPolicy : contentTemplateMethod,
            footerPolicy : footerIconicTriggers
        }; },

        uninstallHandler : function (e) {
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        render : function () {
            var children = [];

            this.props.headerPolicy.bind(this)(children);
            this.props.contentPolicy.bind(this)(children);
            this.props.footerPolicy.bind(this)(children);

            return <li key={this.props.key}>{children}</li>;
        }
    };
});
