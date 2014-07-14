define(['./amd/Insertion', './amd/Store', './amd/install/group', './amd/install/orphanage', './amd/mixin/index'], function (
               Insertion,         Store,                 group,                 orphanage,         mixin){

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
