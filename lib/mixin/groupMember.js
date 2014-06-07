var react = require('react');
var list = require('frux-list');
var DragBus = require('../DragBus');

module.exports = {
    propTypes : {
        panelsAct : react.PropTypes.instanceOf(list.Act).isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus)
    }
};
