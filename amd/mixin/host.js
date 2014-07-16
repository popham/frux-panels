define(['react', './storeItemExclusions'], function (
         react,     storeItemExclusions) {

    return {
        mixins : [storeItemExclusions],

        propTypes : {
            memento : react.PropTypes.object.isRequired,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            initialState : {}
        }; },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };
});
