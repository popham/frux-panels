/** @jsx react.DOM */

var react = require('react');
var storeItemExclusions = require('../mixin/storeItemExclusions');
var Empty = require('../mount/Empty');
var Static = require('../mount/Static');

    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [storeItemExclusions],

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
        },

        memento : function () { return {
            component : Insertion,
            componentProps : this.props
        }; },

        render : function () {
            function installer(memento) {
                return function (event) {
                    this.props.panelsAct.install(
                        this.props.key,
                        Static,
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
                    memento:this.memento(),
                    panelsAct:this.props.panelsAct,
                    orphansAct:this.props.orphansAct} , 
                  react.DOM.ul(null, this.props.components.map(iconify.bind(this)))
                )
            );
        }
    });

    module.exports = Insertion;

