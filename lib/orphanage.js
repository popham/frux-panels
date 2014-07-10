/** @jsx react.DOM */

define(['react', 'frux-list', './panelize', './mixin/panelsPublish', './mixin/storeItemExclusions'], function (
         react,   frux_list,     panelize,           panelsPublish,           storeItemExclusions) {

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

    var Orphanage = react.createClass({
        displayName : 'Orphanage',

        mixins : [panelsPublish],

        render : function () {
            // Cover the whole workspace.
            var style = {
                margin : 0,
                padding : 0,
                position : "absolute",
                width : "100%",
                height : "100%",
            };

            var panel = panelize.bind(null, {});
            return (
                react.DOM.ul( {className:"frux-panels", style:style}, 
                  this.state.panels.map(panel)
                )
            );
        }
    });

    return {
        Store : Store,
        Orphanage : Orphanage
    };
});
