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
            pointer : null
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

        length : function () {
            return this.props.end.minus(this.props.start).length;
        },

        barLength : function () {
            var length = this.length();
            var trackLength = length - this.props.startOffset - this.props.endOffset;

            return Math.min(
                trackLength,
                Math.max(
                    Math.round(trackLength * (length / this.props.contentLength)),
                    this.thickness()
                )
            );
        },

        maxPosition : function () {
            return Math.max(0, this.props.contentLength - Math.floor(this.length));
        },

        transform : function () {
            // End of bar positioned at (0,0).
            var t1 = "translate(0,-"+this.radius()+")";

            // Reorient from x-axis alignment.
            var ell = this.props.end.minus(this.props.start);
            var t2 = "rotate("+Math.atan2(ell.y, ell.x)*180/Math.PI+")";

            // Interpolated position along `this.trackLength()`.
            var offset = this.props.startOffset;
            var trackLength = this.length() - this.props.startOffset - this.props.endOffset;
            var contentLength = this.props.contentLength;
            if (contentLength > 0) {
                var position = this.props.positionLink.value;
                offset += trackLength * (position / contentLength);
            }
            var start = this.props.start.plus(this.direction().scale(offset));
            var t3 = "translate("+start.x+","+start.y+")";

            return [t3, t2, t1].join(' ');
        },

        mouseDown : function (e) {
            if (e.button !== 0) return;

            this.setState({
                dragging : true,
                pointer : new affine.Point(e.pageX, e.pageY)
            });

            e.stopPropagation();
            e.preventDefault();
        },

        mouseMove : function (e) {
            if (!this.state.dragging) return;

            var p = new affine.Point(e.pageX, e.pageY);

            // Project onto end-start
            var delta = p.minus(this.state.pointer).dot(this.direction());
            this.props.positionLink.requestChange(
                Math.max(
                    0,
                    Math.min(
                        this.maxPosition(),
                        this.props.positionLink.value + delta
                    )
                )
            );

            this.setState({ pointer : p });

            e.stopPropagation();
            e.preventDefault();
        },

        mouseUp : function (e) {
            this.setState({
                dragging : false,
                pointer : null
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
             || this.state.pointer === nextState.pointer
            );
        },

        render : function () {
            var r = this.radius();
            var t = this.thickness();
            var length = this.barLength();

            var style = { position : "absolute" };

            return (
                <svg
                    stroke="none"
                    style={style}>
                  <g
                      onMouseDown={this.mouseDown}
                      fill="white"
                      transform={this.transform()}>
                    <circle cx={r} cy={r} r={r} />
                    <rect width={length - 2*r} height={t} x={r} y={0} />
                    <circle cx={length - r} cy={r} r={r} />
                  </g>
                </svg>
            );
        }
    });
});
