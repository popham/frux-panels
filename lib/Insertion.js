/** @jsx react.DOM */

define(['react', 'lodash', './mixin/groupMember'], function (react, _, groupMember) {
    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [groupMember],

        statics : {
            groupMeta : function (components) { return {
                cls : Insertion,
                props : { components : components }
            }; }
        },

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired,
            iconWidth : react.PropTypes.string,
            iconHeight : react.PropTypes.string
        },

        getDefaultProps : function () { return {
            iconWidth : '50px',
            iconHeight : '50px'
        }; },

        mount : function (component) {
            this.props.panelsAct.install.push(this.props.key, component);
        },

        render : function () {
            function installer(component) {
                return function (event) { this.mount(component); }.bind(this);
            }

            function iconify(component) {
                return (
                    react.DOM.li(null, 
                        react.DOM.img( {height:this.props.iconHeight,
                             width:this.props.iconWidth,
                             src:component.cls.url(),
                             onClick:installer.bind(this)(component)} )
                    )
                );
            }

            return (
                react.DOM.li( {key:this.props.key, className:"insertion-point"}, 
                    react.DOM.ul(null, this.props.components.map(iconify.bind(this)))
                )
            );
        }
    });

    return Insertion;
});
