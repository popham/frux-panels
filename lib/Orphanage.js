/** @jsx react.DOM */

define(['react', './panelize'], function (
         react,     panelize) {

    var Install = function (list) {
        this._list = list;
    };

    Install.prototype.push = function (component) {
        this._list._items = this._list._items.clone();
        this._list.append(component);

        this._list.publish.push();
    };

    var Uninstall = function (list) {
        this._list = list;
    };

    Uninstall.prototype.push = function (key) {
        this._list._items = this.list._items.clone();
        this._list.remove(key, 1);

        this._list.publish.push();
    };

    var Store = function () {
        frux_list.List.call(this, []);

        this.act = {
            install : new Install(this),
            uninstall : new Uninstall(this)
        };

        this.publish = new frux_list.Publish(this);
    };

    Store.prototype = Object.create(frux_list.List.prototype);

    return react.createClass({
        displayName : 'Orphanage',

        mixins : [panelsPublish, groupMember],

        getDefaultProps : function () {
            var store = new Store();

            return {
                panelsAct : store.act,
                panelsPublish : store.publish
            };
        },

        render : function () {
            // Cover the whole workspace.
            var style = {
                margin : 0,
                padding : 0,
                position : "absolute",
                width : "100%",
                height : "100%",
            };

            return (
                react.DOM.ul( {className:"frux-panels", style:style}, 
                  this.state.panels.map(this.panelize.bind(this))
                )
            );
        }
    });
});