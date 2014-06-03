var react = require('react');
var DragBus = require('../DragBus');

module.exports = {
    propTypes : function () { return {
        dragBus : react.PropTypes.instanceOf(DragBus)
    }; },

    getInitialState : function () { return {
        activeDrop : false,
        unsubscribe : null
    }; },

// InsertPoint exposes an override method that sets current content to hidden and adds a component as a sibling
// Drop denotes the current mount point given a mount
    handleDragEnter : function (event) {
        this.props.dragBus.act.drop(this.props.group, this.props.key);
    },

    handleDragExit : function (event) {
        this.props.dragBus.act.drop(null, null);
    },

    componentWillMount : function () {
        var u1 = this.props.dragBus.publish.drag.subscribe(
            function (source) {
                this.setState({ activeDrop : source !== null });
            }.bind(this)
        );

        var u2 = this.props.dragBus.publish.drop.subscribe(
            function (target) {
                // Bus activity => done dragging.
                this.setState({ activeDrop : false });
            }.bind(this)
        );

        this.setState({ unsubscribe : function () { u2(); u1(); } });
    },

    componentWillUnmount : function () {
        this.state.unsubscribe();
        this.setState({ unsubscribe : null });
    }
};
