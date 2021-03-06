define(['react', './storeItemExclusions'], function (
         react,     storeItemExclusions) {

    return {
        mixins : [storeItemExclusions],

        propTypes : {
            guestMemento : react.PropTypes.object.isRequired,
            heading : react.PropTypes.string,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            heading : "",
            initialState : {}
        }; },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };
});
