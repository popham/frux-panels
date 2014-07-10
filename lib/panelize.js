define(['lodash'], function (_) {

    return function (baseProps, storeItem, key) {
        var props = _.extend({}, baseProps);
        _.extend(props, storeItem.props);
        props.key = key;

        return storeItem.cls(props);
    };
});
