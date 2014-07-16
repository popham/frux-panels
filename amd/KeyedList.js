define([], function () {

    var Item = function (key, value) {
        this._key = key;
        this._value = value;
    };

    Object.defineProperty(Item.prototype, 'key', {
        get : function () { return this._key; }
    });

    Object.defineProperty(Item.prototype, 'value', {
        get : function () { return this._value; }
    });



    var List = function () {
        this._index = {};
        this._items = [];
        this._nextKey = 1;
    };

    // Nonmutating under public methods.
    Object.defineProperty(List.prototype, 'items', {
        get : function () { return this._items; }
    });

    Object.defineProperty(List.prototype, 'firstKey', {
        get : function () {
            return this._items[0].key;
        }
    });

    Object.defineProperty(List.prototype, 'lastKey', {
        get : function () {
            return this._items[this._items.length-1].key;
        }
    });

    List.prototype.priorKey = function (key) {
        if (key === this.firstKey) { return null; }

        return this._items[this._index[key]-1].key;
    };

    List.prototype.nextKey = function (key) {
        if (key === this.lastKey) { return null; }

        return this._items[this._index[key]+1].key;
    };

    List.prototype.value = function (key) {
        return this._items[this._index[key]].value;
    };

    List.prototype._insert = function (key, values) {
        var position = this._index[key];
        var offset = values.length;
        var tail = this._items.slice(position);

        tail.forEach(function (item) {
            this._index[item.key] += offset;
        }.bind(this));

        this._items = this._items.slice(0, position);
        for (var i=0, j=position; i<offset; ++i, ++j) {
            var k = this._nextKey++;

            this._index[k] = j;
            this._items.push(new Item(k, values[i]));
        }
        this._items = this._items.concat(tail);
    };

    List.prototype.append = function (values) {
        this._items = this._items.slice(0);

        for (var i=0, j=this._items.length; i<values.length; ++i, ++j) {
            var k = this._nextKey++;
            this._index[k] = j;
            this._items.push(new Item(k, values[i]));
        }
    };

    List.prototype.replace = function (key, values) {
        this._items = this._items.slice(0);

        var position = this._index[key];
        var offset = values.length;
        var overflow = position + offset - this._items.length;

        for (var i=0, j=position; i<offset && j<this._items.length; ++i, ++j) {
            this._items[j]._value = values[i];
        }

        if (overflow > 0) {
            this.append(values.slice(overflow));
        }
    };

    List.prototype.splice = function (key, howMany, values) {
        this._items = this._items.slice(0);

        key = this._remove(key, howMany);

        if (values.length === 0) { return; }

        if (key) {
            this._insert(key, values);
        } else {
            this.append(values);
        }
    };

    List.prototype._remove = function (key, howMany) {
        var position = this._index[key];
        var tail = this._items.slice(position+howMany);
        var remove = this._items.slice(position, position+howMany);

        tail.forEach(function (o) { this._index[o.key] -= howMany; }.bind(this));

        this._items = this._items.slice(0, position).concat(tail);
        remove.forEach(function (o) { delete this._index[o.key]; }.bind(this));

        return tail[0] ? tail[0].key : undefined;
    };

    List.prototype.remove = function (key, howMany) {
        this._items = this._items.slice(0);

        this._remove(key, howMany);
    };

    return List;
});
