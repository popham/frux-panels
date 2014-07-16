define(['./amd/group/Insertion', './amd/group/Store', './amd/install/group', './amd/install/orphanage', './amd/mixin/index'], function (
                     Insertion,               Store,                 group,                 orphanage,         mixin){

    return {
        group : {
            Store : Store,
            Insertion : Insertion,
            install : group
        },
        orphanage : { install : orphanage },
        mixin : mixin
    };
});
