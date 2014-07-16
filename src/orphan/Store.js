/** @jsx react.DOM */

define(['react', 'signals', '../KeyedList'], function (
         react,   signals,      KeyedList) {

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

    var Act = function (list) {
        this._list = list;
        this.adoption = new Adoption(this._list);
    };

    Act.prototype.install = function (hostInitialState, memento) {
        this._list.append([{
            hostInitialState : hostInitialState,
            memento : memento
        }]);

        this.push();
    };

    Act.prototype.uninstall = function (key) {
        this._list.remove(key, 1);

        this.push();
    };

    var Store = function () {
        this._list = new KeyedList();
        this.act = new Act(this._list);
        this.publish = new signals.Signal();
    };

    Store.prototype.push = function() {
        this.publish.dispatch(this._list.items);
    }

    return Store;
});
