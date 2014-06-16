/** @jsx react.DOM */

define(['react', '../Insertion', './groupMember', './panelsPublish'], function (
         react,      Insertion,     groupMember,     panelsPublish) {
    /**
     * Default policies
     */
    function headerUninstaller(array) {
        array.push(
            react.DOM.header(null, 
                react.DOM.div(null, 
                    react.DOM.span( {className:"glyphicon glyphicon-remove",
                          onClick:this.uninstall} )
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
                    react.DOM.ul(null, this.state.icons.map(iconify.bind(this)))
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
        mixins : [groupMember, panelsPublish],

        propTypes : {
            headerPolicy : react.PropTypes.func,
            contentPolicy : react.PropTypes.func,
            footerPolicy : react.PropTypes.func
        },

        getDefaultProps : function () { return {
            headerPolicy : headerUninstaller.bind(this),
            contentPolicy : contentTemplateMethod.bind(this),
            footerPolicy : footerIconicTriggers.bind(this)
        }; },

        uninstall : function () {
            var panels = this.props.panelsPublish;
            var key = this.props.key;
            if (!panels.hasPrevious(key) || !panels.hasNext(key)) {
                // Remove ends of the list without fanfare.
                this.props.panelsAct.remove(key);
                return;
            }

            var priorKey = panels.priorKey(key);
            var nextKey = panels.nextKey(key);
            if (pre.cls === Insertion && post.cls === Insertion) {
                // Use the trailing insertion point for the primary metadata.
                // Insertion bumped this point way back when.  Restore it to the
                // prior state so that a quick (insert, remove) yields an
                // identity operation.
                this.props.panelsAct.remove(priorKey, 2);
            } else {
                this.props.panelsAct.remove(key, 1);
            }
        },

        render : function () {
            var children = [];

            this.props.headerPolicy(children);
            this.props.contentPolicy(children);
            this.props.footerPolicy(children);

            return react.DOM.section(null, children);
        }
    };
});
