/** @jsx react.DOM */

define(['react', '../mixin/index', '../panelize'], function (
         react,      mixin,            panelize) {

    return react.createClass({
        displayName : 'Orphanage',

        mixins : [mixin.panelsPublish, mixin.storeItemExclusions],

        render : function () {
            var style = {
                margin : 0,
                padding : 0
            };

            return (
                react.DOM.ul( {className:"frux-panels", style:style}, 
                  this.state.panels.map(panelize, this)
                )
            );
        }
    });
});
