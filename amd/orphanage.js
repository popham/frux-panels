/** @jsx react.DOM */

define(['react', 'frux-list', './panelize', './mixin/panelsPublish', './mixin/storeItemExclusions'], function (
         react,   frux_list,     panelize,           panelsPublish,           storeItemExclusions) {

    var Install = function (list) {
        this._list = list;
    };

    Install.prototype.push = function (bundle) {
        this._list._items = this._list._items.clone();
        this._list._items.append([bundle]);

        this._list.publish.push();
    };

    var Uninstall = function (list) {
        this._list = list;
    };

    Uninstall.prototype.push = function (key) {
        this._list._items = this._list._items.clone();
        this._list._items.remove(key, 1);

        this._list.publish.push();
    };

    var Adoption = function (list) {
        this._list = list;
        this._current = null;
    };

    Object.defineProperty(Adoption.prototype, 'current', {
        get : function () {
            return this._current === null ? null : this._list.value(this._current);
        }
    });

    Adoption.prototype.select = function (key) {
        this._current = key;
        this._list.publish.push();
    };

    Adoption.prototype.unselect = function () {
        this._current = null;
        this._list.publish.push();
    };

    Adoption.prototype.hide = function () {
        if (this._current !== null) {
            this._list._items = this._list._items.clone();

            var bundle = _.extend({}, this._list.value(this._current));
            var props = _.extend({}, bundle.props);
            props.isVisiting = true;
            bundle.props = props;

            this._list._items.replace(this._current, [bundle]);

            this._list.publish.push();
        }
    };

    Adoption.prototype.unhide = function () {
        if (this._current !== null) {
            this._list._item = this._list._items.clone();

            var bundle = _.extend({}, this._list.value(this._current));
            var props = _.extend({}, bundle.props);
            props.isVisiting = false;
            bundle.props = props;

            this._list._items.replace(this._current, [bundle]);

            this._list.publish.push();
        }
    };

    Adoption.prototype.claim = function () {
        if (this._current !== null) {
            var current = this._current;
            this._current = null;

            this.uninstall.push(current);
        }
    };

    var Store = function () {
        frux_list.List.call(this, []);

        this.act = {
            install : new Install(this),
            uninstall : new Uninstall(this),
            adoption : new Adoption(this),
        };

        this.publish = new frux_list.Publish(this);
    };

    Store.prototype = Object.create(frux_list.List.prototype);

    var Orphanage = react.createClass({
        displayName : 'Orphanage',

        mixins : [panelsPublish, storeItemExclusions],

        render : function () {
            // Cover the whole workspace.
            var style = {
                margin : 0,
                padding : 0,
            };

            var panel = panelize.bind(null, this.storeItemExclusions());
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