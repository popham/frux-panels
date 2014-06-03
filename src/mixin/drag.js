var react = require('react');
var Drag = require('../DragBus');

module.exports = {
    propTypes : function () { return {
        dragDispatch : react.PropTypes.instanceOf(Drag)
    }; },

    getDefaultProps : function () { return {
        draggable : true
    }; },

    getInitialState : function () { return {
        unsubscribe : null
    }; },

    handleDragStart : function (event) {
        this.props.dragDispatch.act.drag(this.props.group, this.props.key);
    },

    draggableProxy : function () {
        return null;/*component placeholder absolute positioned ...*/
    },
};
