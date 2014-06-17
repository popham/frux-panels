define(['baconjs', 'lodash', 'frux-list', './Insertion'], function (
         bacon,          _,   frux_list,     Insertion) {
    var Install = function (list) {
        this.stream = new bacon.Bus();
        this.stream.onValue(function (o) {
            list._items = list._items.clone();

            // Copy the insertion point [+] to yield
            // [+] -> [+]' [component] [+].
            list._items.splice(o.key, 0, [
                _.extend({}, list.value(o.key)),
                o.component
            ]);
        });
    };

    Install.prototype.push = function (key, component) {
        this.stream.push({
            key : key,
            component : component
        });
    };

    var Uninstall = function (list) {
        this.stream = new bacon.Bus();
        this.stream.onValue(function (o) {
            list._items = list._items.clone();

            // Removing the first or last panel cannot induce adjacent insertion
            // points.
            var panel = list.iterator(o.key);
            if (!panel.hasNext || !panel.hasPrior) {
                list._items.remove(o.key, 1);
                return;
            }

            // Remove an insertion point also if there would be an adjacent
            // pair.
            var prior = panel.clone().decrement();
            var next = panel.clone().increment();
            if (prior.value.cls === Insertion && next.value.cls === Insertion) {
                list._items.remove(prior.key, 2);
            } else {
                list._items.remove(o.key, 1);
            }
        });

        list.publish.push();
    };

    Uninstall.prototype.push = function (key) {
        this.stream.push({ key : key });
    };

    var Store = function () {
        frux_list.List.call(this);

        this.act = {
            install : new Install(this),
            uninstall : new Uninstall(this),
        };

        this.publish = new Publish(this);
    };

    Store.prototype = Object.create(frux_list.List.prototype);

    return Store;
});
