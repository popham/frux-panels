define(['./lib/DragBus', './lib/Insertion', './lib/Store', './lib/install/group', './lib/mixin/index'], function (
               DragBus,         Insertion,         Store,                 group,         mixin){

    return {
        DragBus : DragBus,
        Insertion : Insertion,
        Store : Store,
        group : group,
        mixin : mixin
    };
});
