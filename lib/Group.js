/** @jsx react.DOM */

define(['react', 'lodash', './Insertion', './mixin/panelsPublish', './mixin/groupMember'], function (
         react,        _,     Insertion,           panelsPublish,           groupMember) {
    return react.createClass({
        mixins : [panelsPublish, groupMember],

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

                return react.DOM.li( {key:key}, panel.cls(props));
            }

            return react.DOM.ul(null, this.state.panels.map(panelize.bind(this)));
        }
    });
});
