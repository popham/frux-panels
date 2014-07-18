/** @jsx react.DOM */

define(['react', '../orphanage/Orphanage', '../orphanage/Store'], function (
         react,                Orphanage,                Store) {

    return function (id) {
        var store = new Store();
        var element = document.getElementById(id);

        react.renderComponent(
            <Orphanage
                panelsPublish={store.publish}
                panelsAct={store.act}
                orphansAct={store.act} />,
            element
        );

        return store.act;
    };
});
