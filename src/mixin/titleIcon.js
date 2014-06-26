define(['react'], function (react) {
    return {
        propTypes : {
            width : react.PropTypes.number,
            height : react.PropTypes.number,
            pathStyle : react.PropTypes.string.isRequired
        }

        defaultProps : {
            width : 20,
            height : 20
        }
    };
});
