/** @jsx react.DOM */

var Group = require('../Group');
var Store = require('frux-list/lib/Store');

module.exports = function (element, dragBus) {
    var panelsStore = new Store();
    var group = <Group panelsPublish={panelsStore.publish}
                       panelsAct={panelsStore.act}
                       dragBus={dragBus} />

    react.renderComponent(group, element);

    return group;
};
