define(['react'], function (react) {

    return {
        propTypes : {
            panelsAct : react.PropTypes.object,
            orphansAct : react.PropTypes.object
        },

        storeItemExclusions : function () { return {
            panelsAct : this.props.panelsAct,
            orphansAct : this.props.orphansAct
        }; }
    };
});
