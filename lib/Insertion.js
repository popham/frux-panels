/** @jsx react.DOM */

define(['react', './mixin/groupMember'], function (react, groupMember) {
    var Insertion = react.createClass({
        mixins : [groupMember],

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
                    var panels = this.props.panelsAct;
                    panels.splice(this.props.key, 0, [
                        {
                            cls : Insertion,
                            props : { components : this.props.components }
                        }, {
                            cls : component.cls,
                            props : component.props
                        }
                    ]);
                }.bind(this);
            }

            function iconify(component) {
                return (
                    react.DOM.li(null, 
                        react.DOM.img( {height:this.props.iconHeight,
                             width:this.props.iconWidth,
                             url:component.cls.url(),
                             onClick:installer.bind(this)(component)} )
                    )
                );
            }

            return react.DOM.ul(null, this.props.components.map(iconify.bind(this)));
        }
    });

    return Insertion;
});
