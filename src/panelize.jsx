/** @jsx react.DOM */

define(['lodash', './Slot'], function (_, Slot) {

    return function (excludes, storeItem, key) {
        var props = { key : key };
        _.extend(props, excludes);
        _.extend(props, storeItem.props);

        return storeItem.component(props);
    };
});
