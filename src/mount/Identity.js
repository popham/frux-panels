define(['react', '../mixin/host'], function (
         react,            host) {

    var Identity = react.createClass({
        displayName : 'Identity',

        mixins : [host],

        propTypes : {
            memento : react.PropTypes.object.isRequired
        },

        statics : {
            hostMemento : function () { return {
                component : Identity,
                componentProps : {}
            }; }
        },

        render : function () {
            return this.props.children;
        }
    });

    return Identity;
});
