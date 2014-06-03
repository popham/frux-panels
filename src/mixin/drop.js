var react = require('react');
var Drag = require('./Drag');

module.exports = {
    propTypes : function () { return {
        dragDispatch : react.PropTypes.instanceOf(Drag)
    }; },

    getInitialState : function () { return {
        activeDrop : false,
        unsubscribe : null
    }; },

// InsertPoint exposes an override method that sets current content to hidden and adds a component as a sibling
// Drop denotes the current mount point given a mount
    handleDragEnter : function (event) {
        this.props.dragDispatch.act.drop(this.props.group, this.props.key);
    },

    handleDragExit : function (event) {
        this.props.dragDispatch.act.drop(null, null);
    },

    componentWillMount : function () {
        var u1 = this.props.dragDispatch.publish.drag.subscribe(
            function (source) {
                this.setState({ activeDrop : source !== null });
            }.bind(this)
        );

        var u2 = this.props.dragDispatch.publish.drop.subscribe(
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
