define(['react', 'affine/lib/2d/primitive'], function (
         react,   affine) {

    var project = function (position, size) {
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

    return {
        propTypes : {
            initialLeft : react.PropTypes.number,
            initialTop : react.PropTypes.number,
            initialWidth : react.PropTypes.number,
            initialHeight : react.PropTypes.number,
            isMounted : react.PropTypes.bool,
            isVisiting : react.PropTypes.bool
        },

        getDefaultProps : function () { return {
            isMounted : true,
            isVisiting : false
        }; },

        getInitialState : function () {
            var position = new affine.Point(
                this.props.initialLeft,
                this.props.initialTop
            );

            var size = new affine.Vector(
                this.props.initialWidth,
                this.props.initialHeight
            );

            return {
                dragOrigin : null,
                dragStartPosition : null,
                position : project(position, size),
                size : size
            };
        },

        isDragging : function () {
            return this.state.dragOrigin !== null;
        },

        dragMouseDown : function (e) {
            if (this.props.isMounted) return;
            if (e.button !== 0) return;

            var element = this.getDOMNode();
            this.setState({
                dragOrigin : new affine.Point(e.clientX, e.clientY),
                dragStartPosition : this.state.position
            });

            e.stopPropagation();
            e.preventDefault();
        },

        dragMouseMove : function (e) {
            if (!this.isDragging()) return;

            var p = new affine.Point(e.clientX, e.clientY);
            var delta = p.minus(this.state.dragOrigin);
            var start = this.state.dragStartPosition;

            this.setState({
                position : project(start.plus(delta), this.state.size)
            });

            e.stopPropagation();
            e.preventDefault();
        },

        dragMouseUp : function (e) {
            this.setState({
                dragOrigin : null,
                dragStartPosition : null
            });

            e.stopPropagation();
            e.preventDefault();
        },

        componentDidUpdate : function (prevProps, prevState) {
            if (this.isDragging() && prevState.dragOrigin === null) {
                document.addEventListener('mousemove', this.dragMouseMove);
                document.addEventListener('mouseup', this.dragMouseUp);
            } else if (!this.isDragging() && prevState.dragOrigin !== null) {
                document.removeEventListener('mousemove', this.dragMouseMove);
                document.removeEventListener('mouseup', this.dragMouseUp);
            }
        },

        shouldComponentUpdate : function (nextProps, nextState) {
            var state = this.state;

            return (
                this.props.initialLeft !== nextProps.initialLeft
             || this.props.initialTop !== nextProps.initialTop
             || this.props.initialWidth !== nextProps.initialWidth
             || this.props.initialHeight !== nextProps.initialHeight
             || this.props.isMounted !== nextProps.isMounted
             || state.dragOrigin !== nextState.dragOrigin
             || state.dragStartPosition !== nextState.dragStartPosition
             || state.position !== nextState.position
             || state.size !== nextState.size
            );
        }
    };
});
