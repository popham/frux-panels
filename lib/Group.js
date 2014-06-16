/** @jsx react.DOM */

define(['react', 'lodash', './Insertion', './mixin/panelsPublish', './mixin/groupMember'], function (
         react,        _,     Insertion,           panelsPublish,           groupMember) {
    return react.createClass({
        mixins : [panelsPublish, groupMember],

        propTypes : {
            initialPanels : react.PropTypes.arrayOf(Object)
        },

        getDefaultProps : function () { return {
            initialPanels : []
        }; },

        getInitialState : function () {
            this.props.panelsAct.append(this.props.initialPanels);
            return {};
        },

        render : function () {
            function panelize(panel, key) {
                var props = _.extend(this.groupMemberProps(), panel.props);
                return react.DOM.li( {key:key}, panel.cls(props));
            }

            return react.DOM.ul(null, this.state.panels.map(panelize.bind(this)));
        }
    });
});
