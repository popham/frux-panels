/** @jsx react.DOM */

var react = require('react');
var signals = require('signals');
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

    Adoption.prototype.push = function () { this._store.push(); }

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

            this.push();
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

            this.push();
        }
    };

    Adoption.prototype.claim = function () {
        if (this._current !== null) {
            var current = this._current;
            this._current = null;

            this._store.act.uninstall(current);
        }
    };

    var Store = function () {
        this._list = new KeyedList();
        this._adoption = new Adoption(this._list);
        this.publish = new signals.Signal();
    };

    Store.prototype.push = function() {
        this.publish.dispatch(this._list.items);
    }

    Store.prototype.act = {
        install : function (hostInitialState, memento) {
            this._list.append([{
                hostInitialState : hostInitialState,
                memento : memento
            }]);

            this.push();
        }.bind(this),

        uninstall : function (key) {
            this._list.remove(key, 1);

            this.push();
        }.bind(this),

        adoption : this._adoption
    }

    module.exports = Store;

