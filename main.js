define(['./lib/Insertion', './lib/Store', './lib/install/group', './lib/install/orphanage', './lib/mixin/panel'], function (
               Insertion,         Store,                 group,                 orphanage,               panel){
    return {
        Insertion : Insertion,
        Store : Store,
        group : group,
        orphanage : orphanage,
        panelMixin : panel
    };
});
