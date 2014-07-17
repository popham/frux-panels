/** @jsx react.DOM */

define(['react', 'affine/2d/primitive', '../mixin/host', '../project', './fork', './close', './Header'], function (
         react,   affine,                         host,      project,     fork,     close,     Header) {

    return react.createClass({
        displayName : 'Orphan',

        mixins : [host],

        propTypes : {
            heading : react.PropTypes.string.isRequired,
            isVisiting : react.PropTypes.bool.isRequired
        },

        /*
          State Types
            position : affine.Point
            size : affine.Vector
        */

        getInitialState : function () { return {
            handleToOrigin : null
        }; },

        unmount : function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        dragStart : function (e) {
            var rect = this.getDOMNode().getBoundingClientRect();
            this.setState({
                handleToOrigin : new affine.Vector(
                    rect.left - e.clientX,
                    rect.top - e.clientY
                )
            });

            this.props.orphansAct.adoption.select(this.props.key);
        },

        drag : function (e) {
            var position = new affine.Point(e.clientX, e.clientY);

            this.setState({
                position : project(
                    position.plus(this.state.handleToOrigin),
                    this.state.size
                )
            });
        },

        dragEnd : function (e) {
            this.setState({ handleToOrigin : null });
        },

        render : function () {
            var style = {
                position : 'absolute',
                padding : 0,
                margin : 0,
                zIndex : 100,
                left : this.state.position.x,
                top : this.state.position.y,
                width : this.state.size.x,
                height : this.state.size.y
            };

            if (this.props.isVisiting) style.display = 'none';

            return (
                react.DOM.li( {key:this.props.key,
                    draggable:"true",
                    onDragStart:this.dragStart,
                    onDrag:this.drag,
                    onDragEnd:this.dragEnd,
                    className:"mount orphan-mount",
                    style:style}, 
                  Header(
                      {onUnmount:this.unmount.bind(this),
                      onFork:fork.bind(this),
                      onClose:close.bind(this)}, 
                    this.props.heading
                  ),
                  this.props.children
                )
            );
        }
    });
});
