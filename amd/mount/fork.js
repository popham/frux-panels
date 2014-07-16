define(['react', 'affine/2d/primitive', '../project'], function (
         react,   affine,                   project) {

    return function (e) {
        var rect = this.getDOMNode().getBoundingClientRect();
        var size = new affine.Vector(rect.offsetWidth, rect.offsetHeight);

        var orphanState = {
            position : project(new affine.Point(rect.left, rect.top), size),
            size : size,
            isVisiting : false
        };

        this.props.orphansAct.install(orphanState, this.props.memento);

        e.stopPropagation();
        e.preventDefault();
    };
});
