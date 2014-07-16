/** @jsx react.DOM */

define(['react', 'affine/2d/primitive', '../mixin/host', '../project', './fork', './close'], function (
         react,   affine,                         host,      project,     fork,     close) {

    var Orphan = react.createClass({
        displayName : 'Orphan',

        mixins : [host],

        propTypes : {
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

            this.props.orphanAct.adoption.select(this.props.key);
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
                <li key={this.props.key}
                    onDragStart={this.dragStart.bind(this)}
                    onDrag={this.drag.bind(this)}
                    onDragEnd={this.dragEnd.bind(this)}
                    className="mount orphan-mount"
                    style={style}>
                  <Header
                      onUnmount={this.unmount.bind(this)}
                      onFork={fork.bind(this)}
                      onClose={close.bind(this)}>
                    {this.props.heading}
                  </Header>
                  {this.props.children}
                </li>
            );
        }
    });

    return Orphan;
});