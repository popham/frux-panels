define(['react', 'frux-list', '../DragBus'], function (
         react,        list,      DragBus) {

    return {
        propTypes : {
            panelsAct : react.PropTypes.instanceOf(list.Act).isRequired,
            dragBus : react.PropTypes.instanceOf(DragBus)
        }
    };
});
