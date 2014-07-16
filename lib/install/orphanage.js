/** @jsx react.DOM */

var react = require('react');
var Orphanage = require('../orphan/Orphanage');
var Store = require('../orphan/Store');

    module.exports = function (id) {
        var store = new Store();
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

