define(['affine/2d/primitive'], function (affine) {

    return project = function (position, size) {
        var bound = new affine.Point(window.innerWidth, window.innerHeight);
        var member = function (lower, point, upper) {
            return new affine.Point(
                Math.max(lower.x, Math.min(point.x, upper.x)),
                Math.max(lower.y, Math.min(point.y, upper.y))
            );
        };

        var upperBound = bound.minus(size);
        return member(new affine.Point(0,0), position, upperBound);
    };
});
