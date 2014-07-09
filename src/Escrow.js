define([], function () {

    var Escrow = function (list) {
        this.resource = null;
    };

    Escrow.prototype.offer = function (resource, onAccept) {
        if (this.resource !== null) {
            console.error('Cannot offer more than one resource for brokerage');
            return;
        }

        this.resource = resource;
        this.onAccept = onAccept;
    };

    Escrow.prototype.accept = function (key, install) {
        if (this.resource === null) {
            console.error('Need a resource to accept');
        }

        install.push(key, this.resource.mementoComponent());
        if (this.onAccept) { this.onAccept(); }
    };

    return Escrow;
});
