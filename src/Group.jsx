/** @jsx react.DOM */

define(['react', 'lodash', './Insertion', './mixin/panelsPublish', './mixin/groupMember'], function (
         react,        _,     Insertion,           panelsPublish,           groupMember) {

    return react.createClass({
        displayName : 'Group',

        mixins : [panelsPublish, groupMember],

        propTypes : {
            heightLink : react.PropTypes.object.isRequired
        },

        componentDidMount : function () {
            var element = this.getDOMNode();
            this.props.heightLink.requestChange(element.offsetHeight);
        },

        componentDidUpdate : function () {
            var element = this.getDOMNode();
            this.props.heightLink.requestChange(element.offsetHeight);
        },

        render : function () {
            function panelize(panel, key) {
                var props = _.extend(this.groupMemberProps(), panel.props);
                props.key = key;
                return panel.cls(props);
            }

            return <ul className="frux-panels">{this.state.panels.map(panelize.bind(this))}</ul>;
        }
    });
});
