define(['react', 'affine/lib/2d/primitive'], function (
         react,   affine) {

    var project = function (lower, member, upper) {
        return new affine.Point(
            Math.max(lower.x, Math.min(member.x, upper.x)),
            Math.max(lower.y, Math.min(member.y, upper.y))
        );
    };

    return {
        propTypes : {
            initialLeft : react.PropTypes.number,
            initialTop : react.PropTypes.number,
            isMounted : react.PropTypes.bool
        },

        getDefaultProps : function () { return {
            initialLeft : 0,
            initialTop : 0,
            isMounted : true
        }; },

        getInitialState : function () { return {
            dragOrigin : null,
            dragStartPosition : null,
            left : this.props.initialLeft,
            top : this.props.initialTop
        }; },

        isDragging : function () {
            return this.state.dragOrigin !== null;
        },

        draggableMouseDown : function (e) {
            if (this.props.isMounted) return;
            if (e.button !== 0) return;

            var element = this.getDOMNode()
            var start = node.getBoundingClientRect();
            this.setState({
                dragOrigin : new affine.Point(e.clientX, e.clientY),
                dragStartPosition : new affine.Point(element.offsetLeft, element.offsetTop),
                dragElementSize : new affine.Vector(element.offsetWidth, element.offsetHeight)
            });

            e.stopPropagation();
            e.preventDefault();
        },

        draggableMouseMove : function (e) {
            if (!this.isDragging()) return;

            var p = new affine.Point(e.clientX, e.clientY);
            var bound = new affine.Point(window.innerWidth, window.innerHeight);
            bound = bound.minus(this.state.dragElementSize);

            var delta = p.minus(this.state.dragOrigin);
            var position = dragStartPosition.plus(delta);
            position = project(new affine.Point(0,0), position, bound);

            this.setState({
                left : position.x,
                top : position.y
            });

            e.stopPropagation();
            e.preventDefault();
        },

        draggableMouseUp : function (e) {
            this.setState({
                dragOrigin : null,
                dragStartPosition : null,
            });

            e.stopPropagation();
            e.preventDefault();
        },

        componentDidUpdate : function (prevProps, prevState) {
            if (this.isDragging() && prevState.dragOrigin === null) {
                document.addEventListener('mousemove', this.draggableMouseMove);
                document.addEventListener('mouseup', this.draggableMouseUp);
            } else if (!this.isDragging() && prevState.dragOrigin !== null) {
                document.removeEventListener('mousemove', this.draggableMouseMove);
                document.removeEventListener('mouseup', this.draggableMouseUp);
            }
        },

        shouldComponentUpdate : function (nextProps, nextState) {
            var state = this.state;

            return (
                this.props.initialLeft !== nextProps.initialLeft
             || this.props.initialTop !== nextProps.initialTop
             || !state.dragOrigin.equal(nextState.draggableOrigin)
             || !state.dragStartPosition.equal(nextState.dragStartPosition)
             || state.left !== nextState.left
             || state.top !== nextState.top
             || state.isMounted !== nextState.isMounted
            );
        }
    };
});
