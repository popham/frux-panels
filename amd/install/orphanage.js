/** @jsx react.DOM */

define(['react', '../orphanage'], function (
         react,      orphanage) {

    var Orphanage = orphanage.Orphanage;

    return function (id) {
        var store = new orphanage.Store();
        var element = document.getElementById(id);

        react.renderComponent(
            Orphanage(
                {panelsPublish:store.publish,
                panelsAct:store.act,
                orphansAct:store.act} ),
            element
        );

        return store.act;
    };
});
