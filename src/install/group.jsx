/** @jsx react.DOM */

var Group = require('../Group');

module.exports = function (element, panelsStore, dragBus) {
    var group = <Group panelsPublish={panelsStore.publish}
                       panelsAct={panelsStore.act}
                       dragBus={dragBus} />;

    react.renderComponent(group, element);

    return group;
};
