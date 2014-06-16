/** @jsx react.DOM */

define(['react', 'lodash', './mixin/groupMember'], function (react, _, groupMember) {
    var Insertion = react.createClass({
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

        render : function () {
            function installer(component) {
                return function (event) {
                    this.props.panelsAct.splice(this.props.key, 0, [
                        {
                            cls : Insertion,
                            props : this.props
                        },
                        component
                    ]);
                }.bind(this);
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

            return react.DOM.ul(null, this.props.components.map(iconify.bind(this)));
        }
    });

    return Insertion;
});
