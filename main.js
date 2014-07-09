define(['./lib/Escrow', './lib/Insertion', './lib/Store', './lib/install/group', './lib/mixin/index'], function (
               Escrow,         Insertion,         Store,                 group,         mixin){
    return {
        Escrow : Escrow,
        Insertion : Insertion,
        Store : Store,
        group : group,
        mixin : mixin
    };
});
