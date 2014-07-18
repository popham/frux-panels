var react = require('react');
var host = require('../mixin/host');

    var Identity = react.createClass({
        displayName : 'Identity',

        mixins : [host],

        statics : {
            hostMemento : function () { return {
                component : Identity,
                componentProps : {}
            }; }
        },

        render : function () { return this.props.children; }
    });

    module.exports = Identity;

