var react = require('react');

    module.exports = function (item) {
        var memento = item.value.memento;
        var props = react.addons.update(memento.componentProps, {
            $merge : this.storeItemExclusions()
        });
        props.hostMemento = item.value.hostMemento;
        props.key = item.key;

        return memento.component(props);
    };

