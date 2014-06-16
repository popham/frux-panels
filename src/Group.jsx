/** @jsx react.DOM */

define(['react', 'lodash', './Insertion', './mixin/panelsPublish', './mixin/groupMember'], function (
         react,        _,     Insertion,           panelsPublish,           groupMember) {
    return react.createClass({
        mixins : [panelsPublish, groupMember],

        componentBaselineProps : function () { return {
            panelsPublish : this.props.panelsPublish,
            panelsAct : this.props.panelsAct,
            dragBus : this.props.dragBus
        }; },

        /**
         * @param {object} props - Non-standard props for `PanelClass` consumption,
         * e.g. the `panelClasses` prop of `Insertion`.
         */
        appendPanel : function (PanelClass, nonBaselineProps) {
            this.props.panelsAct.append([{
                cls : PanelClass,
                props : _.extend(
                    this.componentBaselineProps(),
                    nonBaselineProps
                )
            }]);
        },

        appendInsertion : function (components) {
            this.props.panelsAct.append([{
                cls : Insertion,
                props : {
                    components : components,
                    componentBaselineProps : this.componentBaselineProps()
                }
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
