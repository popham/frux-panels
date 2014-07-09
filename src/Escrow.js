define([], function () {

    var Escrow = function (list) {
        this.component = null;
    };

    Escrow.prototype.bind = function (component) {
        if (this.component !== null) {
            console.error('Cannot bind more than one resource to a Broker');
            return;
        }

        this.component = component;
    };

    Escrow.prototype.claim = function (key, store) {
        if (this.component === null) {
            console.error('Need a bound component to install');
        }

        store.act.install.push(key, this.component);
    };

    return Escrow;
});
