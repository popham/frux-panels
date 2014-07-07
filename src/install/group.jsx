/** @jsx react.DOM */

define(['react', 'dojo/aspect', 'dijit/registry', '../GroupPane'], function (
         react,        aspect,         registry,      GroupPane) {

    return function (id, panelsStore, dragBus) {
        var mount = react.renderComponent(
            <GroupPane
                panelsStore={panelsStore}
                dragBus={dragBus} />,
            document.getElementById(id)
        );

        aspect.after(registry.byId(id), "resize", function() {
            mount();
        });

        return mount();
    };
});
