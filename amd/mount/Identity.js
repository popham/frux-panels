define(['react', '../mixin/host'], function (
         react,            host) {

    var Identity = react.createClass({
        displayName : 'Identity',

        mixins : [host],

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
