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
                react.DOM.header( {className:"title-bar"}, 
                  react.DOM.div(null, 
                    Unmount( {className:"icon", onClick:this.unmount} ),
                    Fork( {className:"icon", onClick:this.fork} ),
                    Close( {className:"icon", onClick:this.close} )
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
                react.DOM.li( {key:this.props.key, className:this.className()}, 
                    children
                )
            );
        }
    };
});
