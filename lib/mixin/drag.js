define(['react', '../DragBus'], function (react, DragBus) {
    return {
        propTypes : function () { return {
            dragBus : react.PropTypes.instanceOf(DragBus)
        }; },

        getDefaultProps : function () { return {
            draggable : true
        }; },

        getInitialState : function () { return {
            unsubscribe : null
        }; },

        handleDragStart : function (event) {
            this.props.dragBus.act.drag(this.props.group, this.props.key);
        },

        draggableProxy : function () {
            return null;/*component placeholder absolute positioned ...*/
        },
    };
});
