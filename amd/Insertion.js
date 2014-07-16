/** @jsx react.DOM */

define(['react', './mixin/storeItemExclusions'], function (
         react,           storeItemExclusions) {

    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [storeItemExclusions],

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
        },

        render : function () {
            function installer(memento) {
                return function (event) {
                    this.props.panelsAct.install.push(
                        this.props.key,
                        StaticMount,
                        memento
                    );
                }.bind(this);
            }

            function iconify(blob) {
                return (
                    react.DOM.li(null, 
                      react.DOM.img(
                          {height:50,
                          width:50,
                          src:blob.iconUrl,
                          onMouseDown:installer.bind(this)(blob.memento)} )
                    )
                );
            }

            return (
                Empty(
                    {key:this.props.key,
                    panelsAct:this.props.panelsAct,
                    orphansAct:this.props.orphansAct} , 
                  react.DOM.ul(null, this.props.components.map(iconify.bind(this)))
                )
            );
        }
    });

    return Insertion;
});
