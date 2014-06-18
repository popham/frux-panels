/** @jsx react.DOM */

define(['react', './groupMember'], function (
         react,     groupMember) {
    /**
     * Default policies
     */
    function headerUninstaller(array) {
        array.push(
            react.DOM.header( {className:"title-bar"}, 
                react.DOM.div(null, 
                    react.DOM.span( {className:"glyphicon glyphicon-remove",
                          onClick:this.uninstallHandler} )
                ),
                react.DOM.p(null, this.state.title)
            )
        );

        return array;
    }

    function contentTemplateMethod(array) {
        if (this.content) {
            array.push(
                react.DOM.div( {className:"body-template"}, this.content())
            );
        }

        return array;
    }

    function footerIconicTriggers(array) {
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
            footerPolicy : react.PropTypes.func,
            className : react.PropTypes.string
        },

        getDefaultProps : function () { return {
            headerPolicy : headerUninstaller,
            contentPolicy : contentTemplateMethod,
            footerPolicy : footerIconicTriggers,
            className : 'frux-panel-component'
        }; },

        uninstallHandler : function (e) {
            this.props.panelsAct.uninstall.push(this.props.key);
        },

        render : function () {
            var children = [];

            this.props.headerPolicy.bind(this)(children);
            this.props.contentPolicy.bind(this)(children);
            this.props.footerPolicy.bind(this)(children);

            return (
                react.DOM.li( {key:this.props.key, className:this.props.className}, 
                    children
                )
            );
        }
    };
});
