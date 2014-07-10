define(['lodash'], function (_) {

    return function (excludes, storeItem, key) {
        var props = _.extend({}, excludes);
        _.extend(props, storeItem.props);
        props.key = key;

        return storeItem.cls(props);
    };
});
