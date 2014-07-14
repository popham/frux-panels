define(['./lib/DragBus', './lib/Insertion', './lib/Store', './lib/install/group', './lib/install/orphanage', './lib/mixin/index'], function (
               DragBus,         Insertion,         Store,                 group,                 orphanage          mixin){

    return {
        DragBus : DragBus,
        Insertion : Insertion,
        Store : Store,
        install : {
            group : group,
            orphange : orphanage
        },
        mixin : mixin
    };
});
