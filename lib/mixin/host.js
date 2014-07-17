var react = require('react');
var storeItemExclusions = require('./storeItemExclusions');

    module.exports = {
        mixins : [storeItemExclusions],

        propTypes : {
            guestMemento : react.PropTypes.object.isRequired,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            initialState : {}
        }; },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };

