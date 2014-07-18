/** @jsx react.DOM */

define(['react', 'affine/2d/primitive', '../mixin/host', '../project', './fork', './close', './Buttons'], function (
         react,   affine,                         host,      project,     fork,     close,     Buttons) {

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

        isDragging : function () {
            return this.state.handleToOrigin !== null;
        },

        mouseDown : function (e) {
            if (e.button !== 0) return;

            var rect = this.getDOMNode().getBoundingClientRect();
            this.setState({
                handleToOrigin : new affine.Vector(
                    rect.left - e.clientX,
                    rect.top - e.clientY
                )
            });

            this.props.orphansAct.adoption.select(this.props.key);

            e.preventDefault();
            e.stopPropagation();
        },

        mouseMove : function (e) {
            if (!this.isDragging()) return;

            var position = new affine.Point(e.pageX, e.pageY);
            this.setState({
                position : project(
                    position.plus(this.state.handleToOrigin),
                    this.state.size
                )
            });

            e.stopPropagation();
            e.preventDefault();
        },

        mouseUp : function (e) {
            this.setState({ handleToOrigin : null });

            this.props.orphansAct.adoption.unselect();

            e.preventDefault();
            e.stopPropagation();
        },

        componentDidUpdate : function (prevProps, prevState) {
            if (this.isDragging() && prevState.handleToOrigin === null) {
                document.addEventListener('mousemove', this.mouseMove);
                document.addEventListener('mouseup', this.mouseUp);
            } else if (!this.isDragging() && prevState.handleToOrigin !== null) {
                document.removeEventListener('mousemove', this.mouseMove);
                document.removeEventListener('mouseup', this.mouseUp);
            }
        },

        componentWillUnmount : function () {
            if (this.isDragging()){
                document.removeEventListener('mousemove', this.mouseMove);
                document.removeEventListener('mouseup', this.mouseUp);
            }
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

            var moveCursor = { cursor : "move" };

            if (this.isDragging()) style.pointerEvents = 'none';
            if (this.props.isVisiting) style.display = 'none';

            return (
                <li key={this.props.key}
                    draggable="true"
                    onMouseDown={this.mouseDown}
                    className="mount orphan-mount"
                    style={style}>
                  <header
                      style={moveCursor}
                      className="title-bar">
                    <Buttons
                        onFork={fork.bind(this)}
                        onClose={close.bind(this)} />
                    <p style={moveCursor}>{this.props.heading}</p>
                  </header>
                  {react.Children.only(this.props.children)}
                </li>
            );
        }
    });
});
