/** @jsx react.DOM */

var Group = require('../Group');

module.exports = function (element, dragBus) {
    var panelStore = new List();
    var group = Group( {panelStore:panelStore, dragBus:dragBus} );
    react.renderComponent(group, element);

    return group;
};
