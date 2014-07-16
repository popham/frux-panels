var bacon = require('baconjs');
var frux_list = require('frux-list');

    var Install = function (list) {
        this.stream = new bacon.Bus();
        this.stream.onValue(function (o) {
            list._items = list._items.clone();

            // Copy the open slot, [+], to yield [+] -> [+]' [component] [+]'.
            var slot = list.value(o.key);
            list._items.splice(o.key, 1, [slot, o.bundle, slot]);

            list.publish.push();
        });
    };

    Install.prototype.push = function (key, Host, memento) {
        this.stream.push({
            key : key,
            bundle : {
                Host : Host,
                memento : memento
            }
        });
    };

    var Uninstall = function (list) {
        this.stream = new bacon.Bus();
        this.stream.onValue(function (o) {
            list._items = list._items.clone();

            var panel = list.iterator(o.key);
            if (!panel.hasNext || !panel.hasPrior) {
                // Removing the first or last slot cannot induce adjacent open
                // slots.
                list._items.remove(o.key, 1);
            } else {
                var prior = panel.clone().decrement();
                var next = panel.clone().increment();
                if (prior.value.component.isPlaceholder() && next.value.component.isPlaceholder()) {
                    // Remove an insertion point also if there would be an
                    // adjacent pair.
                    list._items.remove(prior.key, 2);
                } else {
                    list._items.remove(o.key, 1);
                }
            }

            list.publish.push();
        });
    };

    Uninstall.prototype.push = function (key) {
        this.stream.push({ key : key });
    };

    var Store = function (initial) {
        frux_list.List.call(this, initial);

        this.act = {
            install : new Install(this),
            uninstall : new Uninstall(this)
        };

        this.publish = new frux_list.Publish(this);
    };

    Store.prototype = Object.create(frux_list.List.prototype);

    module.exports = Store;

