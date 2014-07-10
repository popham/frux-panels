define(['react'], function (react) {

    return {
        propTypes : {
            panelsAct : react.PropTypes.object.isRequired,
            orphansAct : react.PropTypes.object.isRequired
        },

        storeItemExclusions : function () { return {
            panelsAct : this.props.panelsAct,
            orphansAct : this.props.orphansAct
        }; }
    };
});
