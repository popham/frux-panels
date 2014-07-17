/** @jsx react.DOM */

var react = require('react');
var signals = require('signals');
var Orphan = require('../mount/Orphan');
var KeyedList = require('../KeyedList');

    var Adoption = function (store) {
        this._store = store;
        this._current = null;
    };

    Object.defineProperty(Adoption.prototype, '_list', {
        get : function () {
            return this._store._list;
        }
    });

    Adoption.prototype._push = function () { this._store.push(); };

    Object.defineProperty(Adoption.prototype, 'currentMemento', {
        get : function () {
            if (this._current === null) return null;

            var bundle = this._list.value(this._current);

            return bundle.memento;
        }
    });

    Adoption.prototype.select = function (key) {
        this._current = key;
    };

    Adoption.prototype.unselect = function () {
        this._current = null;
    };

    Adoption.prototype.visit = function () {
        if (this._current !== null) {
            var bundle = react.addons.update(this._list.value(this._current), {
                memento : {componentProps : {
                    $merge : {isVisiting : true}
                } }
            });
            this._list.replace(this._current, [bundle]);

            this._push();
        }
    };

    Adoption.prototype.unvisit = function () {
        if (this._current !== null) {
            var bundle = react.addons.update(this._list.value(this._current), {
                memento : {componentProps : {
                    $merge : {isVisiting : false}
                } }
            });
            this._list.replace(this._current, [bundle]);

            this._push();
        }
    };

    Adoption.prototype.claim = function () {
        if (this._current !== null) {
            var current = this._current;
            this._current = null;

            this._store.act.uninstall(current);
        }
    };

    var Act = function (store) {
        this._store = store;
        this.adoption = new Adoption(this);
    };

    Object.defineProperty(Act.prototype, '_list', {
        get : function () { return this._store._list; }
    });

    Act.prototype._push = function () { this._store.push(); };

    Act.prototype.install = function (position, size, memento) {
        var hostMemento = {
            component : Orphan,
            componentProps : {
                initialState : { position:position, size:size },
                isVisiting : false
            }
        };

        this._list.append([{
            hostMemento : hostMemento,
            memento : memento
        }]);

        this._push();
    };

    Act.prototype.uninstall = function (key) {
        this._list.remove(key, 1);

        this._push();
    };

    var Store = function () {
        this._list = new KeyedList();
        this.act = new Act(this);
        this.publish = new signals.Signal();
    };

    Store.prototype.push = function() {
        this.publish.dispatch(this._list.items);
    };

    module.exports = Store;

