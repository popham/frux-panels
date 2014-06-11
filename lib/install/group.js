/** @jsx react.DOM */

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['react', '../Group'], function (react, Group) {
    return function (element, panelsStore, dragBus) {
        var group = Group( {panelsPublish:panelsStore.publish,
                           panelsAct:panelsStore.act,
                           dragBus:dragBus} );

        react.renderComponent(group, element);

        return group;
    };
});
