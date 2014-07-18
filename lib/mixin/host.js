var react = require('react');
var storeItemExclusions = require('./storeItemExclusions');

    module.exports = {
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

