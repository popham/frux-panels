/** @jsx react.DOM */

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['react', './mixin/groupMember'], function (react, groupMember) {
    var Insertion = react.createClass({
        mixins : [groupMember],

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
        },

        render: function () {
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
                        react.DOM.img( {height:this.state.iconHeight,
                             width:this.state.iconWidth,
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
