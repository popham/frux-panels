/** @jsx react.DOM */

var react = require('react');
var mixin = require('../mixin/index');
var Orphan = require('../mount/Orphan');

    module.exports = react.createClass({
        displayName : 'Orphanage',

        mixins : [mixin.panelsPublish, mixin.storeItemExclusions],

        render : function () {
            var style = {
                margin : 0,
                padding : 0
            };

            function panelize(item) {
                var memento = item.value.memento;
                return memento.component(
                    react.addons.update(memento.componentProps, {
                        $merge : this.storeItemExclusions(),
                        $merge : {Host:Orphan, key:item.key}
                    })
                );
            }

            return (
                react.DOM.ul( {className:"frux-panels", style:style}, 
                  this.state.panels.map(panelize, this)
                )
            );
        }
    });
