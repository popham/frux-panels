/** @jsx react.DOM */

var react = require('react');
var affine = require('affine/2d/primitive');

    var project = function (left, member, right) {
        return Math.max(0, Math.min(member, right));
    };

    module.exports = react.createClass({
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
            dragOrigin : null,
            dragStartPosition : null
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

        trackLength : function () {
            return this.length() - this.props.startOffset - this.props.endOffset;
        },

        barLength : function () {
            var trackLength = this.trackLength();
            var bar = Math.round(trackLength * (this.length() / this.props.contentLength));

            return project(this.thickness(), bar, trackLength);
        },

        maxPosition : function () {
            return Math.round(Math.max(0, this.props.contentLength - this.length()));
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
                offset += this.trackLength() * (position / contentLength);
            }
            var start = this.props.start.plus(this.direction().scale(offset));
            var t3 = "translate("+start.x+","+start.y+")";

            return [t3, t2, t1].join(' ');
        },

        isDragging : function () {
            return this.state.dragOrigin !== null;
        },

        dragStart : function (e) {
            if (e.button !== 0) return;

            this.setState({
                dragOrigin : new affine.Point(e.pageX, e.pageY),
                dragStartPosition : this.props.positionLink.value
            });

            e.stopPropagation();
            e.preventDefault();
        },

        drag : function (e) {
            if (!this.isDragging()) return;

            var p = new affine.Point(e.pageX, e.pageY);
            var direction = this.direction();

            var k = this.props.contentLength / this.trackLength();
            var position = this.state.dragStartPosition;
            position += k * p.minus(this.state.dragOrigin).dot(direction);
            position = project(0, position, this.maxPosition());
            this.props.positionLink.requestChange(position);

            e.stopPropagation();
            e.preventDefault();
        },

        dragEnd : function (e) {
            this.setState({
                dragOrigin : null,
                dragStartPosition : null
            });

            e.stopPropagation();
            e.preventDefault();
        },

        shouldComponentUpdate : function (nextProps, nextState) {
            var props = this.props;

            return (
                !props.start.equal(nextProps.start)
             || !props.end.equal(nextProps.end)
             || props.startOffset !== nextProps.startOffset
             || props.endOffset !== nextProps.endOffset
             || props.contentLength !== nextProps.contentLength
             || props.thickness !== nextProps.thickness
             || props.positionLink.value !== nextProps.positionLink.value
             || this.state.dragOrigin !== nextState.dragOrigin
             || this.state.dragStartPosition !== nextState.dragStartPosition
            );
        },

        render : function () {
            var r = this.radius();
            var t = this.thickness();
            var length = this.barLength();

            var svgStyle = {
                position : "absolute",
                overflow : "visible",
                'pointer-events' : "none"
            };

            var barStyle = { 'pointer-events' : "all" };

            return (
                react.DOM.svg(
                    {stroke:"none",
                    style:svgStyle}, 
                  react.DOM.g(  {onMouseDown:this.mouseDown,
                      className:"scrollbar",
                      transform:this.transform(),
                      style:barStyle}, 
                    react.DOM.circle( {cx:r, cy:r, r:r} ),
                    react.DOM.rect( {width:length - 2*r, height:t, x:r, y:0} ),
                    react.DOM.circle( {cx:length - r, cy:r, r:r} )
                  )
                )
            );
        }
    });

