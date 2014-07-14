/** @jsx react.DOM */

define(['react', './mixin/storeItemExclusions', './Slot'], function (
         react,           storeItemExclusions,     Slot) {

    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [storeItemExclusions],

        statics : {
            bundle : function (components) { return {
                component : Insertion,
                props : { components : components }
            }; },
            isPlaceholder : function () { return true; }
        },

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
        },

        render : function () {
            function installer(bundle) {
                return function (event) {
                    this.props.panelsAct.install.push(this.props.key, bundle);
                }.bind(this);
            }

            function iconify(bundle) {
                return (
                    react.DOM.li(null, 
                      react.DOM.img(
                          {height:50,
                          width:50,
                          src:bundle.component.url(),
                          onMouseDown:installer.bind(this)(bundle)} )
                    )
                );
            }

            return (
                react.DOM.li( {key:this.props.key, className:"insertion-point"}, 
                  Slot(
                      {isPlaceholder:true,
                      panelsAct:this.props.panelsAct,
                      orphansAct:this.props.orphansAct}, 
                    react.DOM.ul(null, this.props.components.map(iconify.bind(this)))
                  )
                )
            );
        }
    });

    return Insertion;
});