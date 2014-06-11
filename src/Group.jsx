/** @jsx react.DOM */

if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['react', 'lodash', './Insertion'], function (
         react,        _,     Insertion) {
    return react.createClass({
        mixins : [require('./mixin/panelsPublish'), require('./mixin/groupMember')],

        /**
         * @param {object} props - Non-standard props for `PanelClass` consumption,
         * e.g. the `panelClasses` prop of `Insertion`.
         */
        appendPanel : function (PanelClass, nonBaselineProps) {
            var props = _.extend({
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
                var props = _.extend({
                    panelsAct : this.props.panelsAct,
                    dragBus : this.props.dragBus
                }, panel.props);

                return <li key={key}>{panel.cls(props)}</li>;
            }

            return <ul>{this.state.panels.map(panelize.bind(this))}</ul>;
        }
    });
});
