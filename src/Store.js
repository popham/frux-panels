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

            list.publish.push();
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

            var panel = list.iterator(o.key);
            if (!panel.hasNext || !panel.hasPrior) {
                // Removing the first or last panel cannot induce adjacent
                // insertion points.
                list._items.remove(o.key, 1);
            } else {
                var prior = panel.clone().decrement();
                var next = panel.clone().increment();
                if (prior.value.cls === Insertion && next.value.cls === Insertion) {
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

    return Store;
});
