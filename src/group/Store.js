define(['signals', '../mount/Static', '../mount/Empty', '../KeyedList'], function (
         signals,            Static,            Empty,      KeyedList) {

    var Store = function (initial) {
        this._list = new KeyedList();
        this.publish = new signals.Signal();
    };

    Store.prototype._push = function () {
        this.publish.dispatch(this._list.items);
    };

    Store.prototype.act = {
        install : function (key, Host, memento) {
            var oldBundle = this._list.value(key);
            this._list.splice(key, 1, [
                oldBundle,
                {Host:Host, memento:memento},
                oldBundle
            ]);

            this._push();
        }.bind(this),

        uninstall : function (key) {
            if (key === this._list.firstKey || key === this._list.lastKey) {
                // First and last list members cannot induce adjacent Empties.
                this._list.remove(key, 1);
                return;
            }

            var p = this._list.priorKey(key);
            var n = this._list.nextKey(key);

            var priorBundle = this._list.value(p);
            var nextBundle = this._list.value(n);

            var adjacentEmpties = priorBundle.Host === Empty && nextBundle.Host === Empty;
            if (adjacentEmpties && priorBundle.memento === nextBundle.memento) {
                this._list.remove(p, 2);
            } else {
                this._list.remove(key, 1);
            }

            this._push();
        }.bind(this)
    }

    Store.prototype.appendStatic = function (memento) {
        this._list.append([{Host:Static, memento:memento}]);
        this._push();
    };

    Store.prototype.appendEmpty = function (memento) {
        this._list.append([{Host:Empty, memento:memento}]);
        this._push();
    };

    return Store;
});