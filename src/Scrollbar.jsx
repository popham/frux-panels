/** @jsx react.DOM */

define(['react', 'affine/lib/2d/primitive'], function (
         react,   affine) {

    return react.createClass({
        displayName : 'Scrollbar',

        propTypes : {
            start : react.PropTypes.instanceOf(affine.Point).isRequired,
            end : react.PropTypes.instanceOf(affine.Point).isRequired,
            startOffset : react.PropTypes.number.isRequired,
            endOffset : react.PropTypes.number.isRequired,
            contentLength : react.PropTypes.number.isRequired,
            thickness : react.PropTypes.number.isRequired,
            positionLink : react.PropTypes.object.isRequired
        },

        getInitialState : function () { return {
            dragging : false,
            origin : null
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
            return this.props.start.plus(this.direction().scale(offset));
        },

        insetEnd : function (offset) {
            return this.props.end.minus(this.direction().scale(offset));
        },

        trackLength : function () {
            var total = this.props.end.minus(this.props.start).length;
            return total - this.props.endOffset - this.props.startOffset;
        },

        barLength : function () {
            // The scrollbar grip's length indicates percent of content shown.
            return Math.min(
                this.trackLength(),
                Math.max(
                    Math.round(Math.pow(this.trackLength(), 2) / this.props.contentLength),
                    this.thickness()
                )
            );
        },

        maxPosition : function () {
            var frameLength = this.props.end.minus(this.props.start).length;
            return Math.max(0, this.props.contentLength - Math.floor(frameLength));
        },

        transform : function () {
            // End of bar positioned at (0,0).
            var t1 = "translate(0,-"+this.radius()+")";

            // Reorient from x-axis alignment.
            var ell = this.props.end.minus(this.props.start);
            var t2 = "rotate("+Math.atan2(ell.y, ell.x)*180/Math.PI+")";

            // Interpolated position along `this.trackLength()`.
            var offset = this.props.startOffset;
            var contentLength = this.props.contentLength;
            if (contentLength > 0) {
                var position = this.props.positionLink.value;
                offset += (position / contentLength) * this.trackLength();
            }
            var start = this.props.start.plus(this.direction().scale(offset));
            var t3 = "translate("+start.x+","+start.y+")";

            return [t1, t2, t3].join(' ');
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

            var n = this.direction();
            var p = new affine.Point(e.pageX, e.pageY);

            // Project onto end-start
            var frame = p.minus(this.props.start).dot(n) - this.props.startOffset;
            var position = frame * this.props.contentLength / this.trackLength();

            this.props.positionLink.requestChange(Math.max(0, Math.min(this.maxPosition(), position)));

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

        shouldComponentUpdate : function (nextProps, nextState) {
            var props = this.props;

            return (
                props.start.equal(nextProps.start)
             || props.end.equal(nextProps.end)
             || props.startOffset !== nextProps.startOffset
             || props.endOffset !== nextProps.endOffset
             || props.contentLength !== nextProps.contentLength
             || props.thickness !== nextProps.thickness
             || props.positionLink.value !== nextProps.positionLink.value
             || this.state.dragging !== nextState.dragging
             || this.state.origin.equal(nextState.origin)
            );
        },

        render : function () {
            var r = this.radius();
            var t = this.thickness();
            var length = this.barLength();

            return (
                <svg
                    width={length}
                    height={t}
                    stroke="none"
                    transform={this.transform()}>
                  <g onMouseDown={this.mouseDown}>
                    <circle cx={r} cy={r} r={r} />
                    <rect width={length - 2*r} height={t} x={r} y="0" />
                    <circle cx={length - r} cy={r} r={r} />
                  </g>
                </svg>
            );
        }
    });
});
