/** @jsx react.DOM */

define(['react', '../orphanage'], function (
         react,      orphanage) {

    var Orphanage = orphanage.Orphanage;

    return function (id) {
        var store = orphanage.Store();
        var element = document.getElementById(id);

        react.renderComponent(
            Orphanage( {panelsPublish:store.publish} ),
            element
        );

        return store.act;
    };
});
