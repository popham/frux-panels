if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./lib/DragBus', './lib/install/group'], function (
               DragBus,                 group ){
    return {
        DragBus : DragBus,
        group : group
    };
});
