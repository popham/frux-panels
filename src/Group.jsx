/** @jsx react.DOM */

var react = require('react');
var merge = require('react/lib/mergeInto');
var DragBus = require('./DragBus');
var List = require('../list/Store');

var module.exports = react.createClass({
    propTypes : function () { return {
        panelStore : react.PropTypes.instanceOf(List),
        dragBus : react.PropTypes.instanceOf(DragBus)
    }; },

    getInitialState : function () { return {
        panels : null,
        nextKey : 1,
        unsubscribe : null
    }; },

    componentWillMount : function () {
        var unsubscribe = this.props.panelStore.publish.items.subscribe(
            function (items) {
                this.setState({ panels : items });
            }.bind(this)
        );

        this.setState({ unsubscribe : unsubscribe });
    },

    componentWillUnmount : function () {
        this.state.unsubscribe();
        this.setState({ panels : null });
        this.setState({ unsubscribe : null });
    },

    /**
     * Append a panel to the groups tail.
     *
     * @param {Class} PanelClass
     * @param {object} props - Non-standard props for `PanelClass` consumption,
     * e.g. the `panelClasses` prop of `Insertion`.
     */
    append : function (PanelClass, props) {
        this.state.panelStore.act.append({
            cls : panelClass,
            key : this.state.nextKey,
            props : props
        });

        this.setState({ nextKey : this.state.nextKey + 1 });
    },

    render : function () {
        function panelize(panel, index) {
            // Baseline props that all panels use.
            var props = {
                panels : this.props.panelStore,
                position : index,
                dragBus : this.props.dragBus
            };

            // Nonbaseline props for this particular panel.
            mergeInto(props, panel.props);

            return <li key={panel.key}>{panel.cls(props)}</li>;
        }.bind(this)

        return <ul>{this.state.panels.map(panelize, this)}</ul>;
    }
});
