/** @jsx react.DOM */

define(['react', '../Group'], function (react, Group) {
    return function (element, panelsStore, dragBus, panels) {
        var group = Group( {panelsPublish:panelsStore.publish,
                           panelsAct:panelsStore.act,
                           dragBus:dragBus,
                           initialPanels:panels} );

        react.renderComponent(group, element);

        return group;
    };
});
