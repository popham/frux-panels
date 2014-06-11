define(['baconjs'], function (bacon) {
    var Act = function () {
        this.streams = {
            drag : new bacon.Bus(),
            drop : new bacon.Bus()
        };
    };

    Act.prototype.drag = function (list, position) {
        this.streams.drag.push({
            list : list,
            position : position
        });
    };

    Act.prototype.drop = function (list, position) {
        this.streams.drop.push({
            list : list,
            position : position
        });
    };

    return function () {
        this.act = new Act();
        this.publish = {
            drag : this.act.streams.drag.toProperty(),
            drop : this.act.streams.drop.toProperty()
        };
    };
});
