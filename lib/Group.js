/** @jsx react.DOM */

var react = require('react');
var extend = require('xtend');
var Insertion = require('./Insertion');

module.exports = react.createClass({
    mixins : [require('./mixin/panelsPublish'), require('./mixin/groupMember')],

    /**
     * @param {object} props - Non-standard props for `PanelClass` consumption,
     * e.g. the `panelClasses` prop of `Insertion`.
     */
    appendPanel : function (PanelClass, nonBaselineProps) {
        var props = extend({
            panelsPublish : this.props.panelsPublish,
            panelsAct : this.props.panelsAct,
            dragBus : this.props.dragBus
        }, nonBaselineProps);

        this.props.panelsAct.append([{
            cls : PanelClass,
            props : props
        }]);
    },

    appendInsertion : function (components) {
        this.props.panelsAct.append([{
            cls : Insertion,
            props : { components : components }
        }]);
    },

    render : function () {
        function panelize(panel, key) {
            // Baseline props that all panels use.
            var props = {
                panelsAct : this.props.panelsAct,
                dragBus : this.props.dragBus
            };

            // Nonbaseline props for this particular panel.
            merge(props, panel.props);

            return react.DOM.li( {key:key}, panel.cls(props));
        }

        return react.DOM.ul(null, this.state.panels.map(panelize.bind(this)));
    }
});
