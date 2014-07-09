/** @jsx react.DOM */

define(['react', 'dojo/aspect', 'dijit/registry', '../GroupPane'], function (
         react,        aspect,         registry,      GroupPane) {

    return function (id, panelsStore, escrow) {
        var element = document.getElementById(id);
        var mount = function () {
            var container = element.children[0];
            react.renderComponent(
                <GroupPane
                    panelsStore={panelsStore}
                    escrow={escrow}
                    width={container.offsetWidth}
                    height={container.offsetHeight} />,
                element
            );
        };

        aspect.after(registry.byId(id), "resize", function() {
            mount();
        });

        return mount();
    };
});
