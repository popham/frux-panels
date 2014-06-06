var react = require('react');
var Act = require('frux-list/lib/Act');
var DragBus = require('./DragBus');

module.exports = {
    propTypes : {
        panelsAct : react.PropTypes.instanceOf(Act).isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus)
    }
};
