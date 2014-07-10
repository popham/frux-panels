/** @jsx react.DOM */

define(['react', 'lodash', './mixin/storeItemExclusions'], function (
         react,        _,           storeItemExclusions) {
    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [storeItemExclusions],

        statics : {
            storeItem: function (components) { return {
                cls : Insertion,
                props : { components : components }
            }; }
        },

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired,
            iconWidth : react.PropTypes.number,
            iconHeight : react.PropTypes.number
        },

        getDefaultProps : function () { return {
            iconWidth : 50,
            iconHeight : 50
        }; },

        mount : function (cls, memento) {
            var props = _.extend({ isMounted : true }, memento);

            this.props.panelsAct.install.push(this.props.key, cls.storeItem(props));
            this.props.orphansAct.uninstall.push(this.props.key);
        },

        render : function () {
            function installer(component) {
                return function (event) {
                    this.props.panelsAct.install.push(this.props.key, component);
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

            return (
                react.DOM.li( {key:this.props.key, className:"insertion-point"}, 
                    react.DOM.ul(null, this.props.components.map(iconify.bind(this)))
                )
            );
        }
    });

    return Insertion;
});
