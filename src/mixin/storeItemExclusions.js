define(['react'], function (
         react) {

    return {
        propTypes : {
            panelsAct : react.PropTypes.object.isRequired
        },

        groupMemberProps : function () { return {
            panelsAct : this.props.panelsAct
        }; }
    };
});
