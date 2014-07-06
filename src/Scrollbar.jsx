/** @jsx react.DOM */

define(['react', 'scroller/lib/Scroller', 'affine/lib/2d/primitive'], function (
         react,                Scroller,   affine) {

    return react.creactClass({
        displayName : 'Scrollbar',

        propTypes : function () { return {
            start : react.PropTypes.instanceOf(affine.Point).isRequired,
            end : react.PropTypes.instanceOf(affine.Point).isRequired,
            startOffset : react.PropTypes.number.isRequired,
            endOffset : react.PropTypes.number.isRequired,
            contentLength : react.PropTypes.number.isRequired,
            thickness : react.PropTypes.number.isRequired
        }; },

        getInitialState : function () { return {
            dragging : false,
            origin : null,
            position : 0.0, // Barycentric coordinate of scroll end point.
        }; },

        radius : function () {
            return this.thickness() / 2;
        },

        thickness : function () {
            var t = this.props.thickness;
            return t % 2 ? t : t+1;
        },

        direction : function () {
            var ell = this.props.end.minus(this.props.start);
            return ell.scale(1/ell.length);
        },

        insetStart : function (offset) {
            var n = this.direction();
            return this.props.start.plus(n.scale(offset));
        },

        insetEnd : function (offset) {
            var n = this.direction();
            return this.props.end.minus(n.scale(offset));
        },

        scrollPath : function () {
            var startC = this.insetStart(this.props.startOffset + this.radius());
            var endC = this.insetEnd(this.props.endOffset + this.barLength() - this.radius());

            return endC.minus(startC);
        },

        trackLength : function () {
            var length = this.props.end.minus(this.props.start).length;
            return length - this.props.endOffset - this.props.startOffset;
        },

        barLength : function () {
            // The scrollbar grip's length indicates percent of content shown.
            return min(
                this.trackLength(),
                max(
                    Math.round(Math.pow(this.trackLength(), 2) / this.props.contentLength),
                    this.thickness()
                )
            );
        },

        weight : function (position) {
            var x = position.minus(this.state.origin);
            var ell = this.scrollPath();

            /*
             * b' = norm(start + b*(end-start) + (x dot ell)/(ell dot ell) * ell - start) / norm(ell)
             * =
             * norm(b*ell + (x dot ell)/(ell dot ell) * ell)/norm(ell)
             * =
             * norm((b + (x dot ell)/(ell dot ell)) * ell) / norm(ell)
             * =
             * (b + (x dot ell)/(ell dot ell)) * norm(ell) / norm(ell)
             * =
             * b + (x dot ell)/(ell dot ell)
             */

            return max(0, min(1.0, this.state.position + x.dot(ell) / ell.dot(ell)));
        },

        mouseDown : function (e) {
            if (e.button !== 0) return;

            this.setState({
                dragging : true,
                origin : new affine.Point(e.pageX, e.pageY)
            });

            e.stopPropagation();
            e.preventDefault();
        },

        mouseMove : function (e) {
            if (!this.state.dragging) return;

            this.setState({
                position : this.weight(new affine.Point(e.pageX, e.pageY))
            });

            e.stopPropagation();
            e.preventDefault();
        },

        mouseUp : function (e) {
            this.setState({
                dragging : false,
                origin : null
            });

            e.stopPropagation();
            e.preventDefault();
        },

        componentDidUpdate : function (props, state) {
            if (this.state.dragging && !state.dragging) {
                document.addEventListener('mousemove', this.mouseMove);
                document.addEventListener('mouseup', this.mouseUp);
            } else if (!this.state.dragging && state.dragging) {
                document.removeEventListener('mousemove', this.mouseMove);
                document.removeEventListener('mouseup', this.mouseUp);
            }
        },

        render : function () {
            var length = this.barLength() - this.props.thickness;
            var radius = this.props.thickness / 2;

            var startC = this.insetStart(this.props.startOffset + radius);
            var endC = startC.plus(this.direction().scale(length));

            return (
                <svg
                    width={this.trackLength()}
                    height={this.props.thickness}
                    stroke="none" >
                  <circle
                      cx={this.props.x+this.props.thickness/2}
                      cy={this.props.y+this.props.thickness/2}
                      r={this.props.thickness/2} />
                  <rect
                      width={this.props.thickness}
                      height={this.props.length}
                      x={this.props.x}
                      y={this.props.y+this.props.thickness/2} />
                  <circle
                      cx={this.props.x+this.props.thickness/2}
                      cy={this.props.y+this.props.length-this.props.thickness}
                      r={this.props.thickness/2} />
                </svg>
            );
        }
    });
});
