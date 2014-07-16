/** @jsx react.DOM */

var react = require('react');
var aspect = require('dojo/aspect');
var registry = require('dijit/registry');
var Pane = require('../group/Pane');

    module.exports = function (id, panelsStore, orphansAct) {
        var element = document.getElementById(id);
        var mount = function () {
            var container = element.children[0];
            react.renderComponent(
                Pane(
                    {panelsStore:panelsStore,
                    orphansAct:orphansAct,
                    width:container.offsetWidth,
                    height:container.offsetHeight} ),
                element
            );
        };

        aspect.after(registry.byId(id), "resize", function() {
            mount();
        });

        return mount();
    };

