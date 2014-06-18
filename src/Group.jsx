/** @jsx react.DOM */

define(['react', 'lodash', './Insertion', './mixin/panelsPublish', './mixin/groupMember'], function (
         react,        _,     Insertion,           panelsPublish,           groupMember) {
    return react.createClass({
        mixins : [panelsPublish, groupMember],

        render : function () {
            function panelize(panel, key) {
                var props = _.extend(this.groupMemberProps(), panel.props);
                return <li key={key}>{panel.cls(props)}</li>;
            }

            return <ul>{this.state.panels.map(panelize.bind(this))}</ul>;
        }
    });
});
