define(['require', 'react', 'signals', '../mount/Static', '../mount/Empty', '../KeyedList'], function (
         require,   react,   signals,            Static,            Empty,      KeyedList) {

    var Act = function (store) {
        this._store = store;
    };

    Object.defineProperty(Act.prototype, '_list', {
        get : function () { return this._store._list; }
    });

    Act.prototype._push = function () { this._store.push(); };

    Act.prototype.install = function (key, memento) {
        var oldBundle = this._list.value(key);

        this._list.splice(key, 1, [
            oldBundle,
            {hostMemento:Store.staticHostMemento(), memento:memento},
            oldBundle
        ]);

        this._push();
    };

    Act.prototype.uninstall = function (key) {
        if (key === this._list.firstKey || key === this._list.lastKey) {
            // First and last list members cannot induce adjacent Empties.
            this._list.remove(key, 1);
            this._push();
            return;
        }

        var p = this._list.priorKey(key);
        var n = this._list.nextKey(key);

        var priorBundle = this._list.value(p);
        var nextBundle = this._list.value(n);

        // Fragile, but fast.  I'm using the same bundle to create all of a
        // Group's insertion points, and on creation, the old bundle gets
        // reused.  If another type of insertion point enters the fray, then
        // I don't know whether they should collapse to a single on adjacency.
        // This works under the current usage....
        var adjacentEmpties = priorBundle === nextBundle
                           && priorBundle.hostMemento.component === Empty;
        if (adjacentEmpties) {
            this._list.remove(p, 2);
        } else {
            this._list.remove(key, 1);
        }

        this._push();
    };

    var Store = function (initial) {
        this._list = new KeyedList();
        this.act = new Act(this);
        this.publish = new signals.Signal();
    };

    Store.staticHostMemento = function () { return {
        component : Static,
        componentProps : {}
    }; };

    Store.emptyHostMemento = function () { return Empty.hostMemento(); };

    Store.prototype.push = function () {
        this.publish.dispatch(this._list.items);
    };

    Store.prototype.appendStatic = function (memento) {
        this._list.append([{
            hostMemento : Store.staticHostMemento(),
            memento : memento
        }]);
        this.push();
    };

    Store.prototype.appendEmpty = function (memento) {
        this._list.append([{
            hostMemento : Store.emptyHostMemento(),
            memento : memento
        }]);
        this.push();
    };

    return Store;
});
