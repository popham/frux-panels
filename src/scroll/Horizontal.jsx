/** @jsx react.DOM */

define(['react'], function (react) {
    return react.creactClass({
        displayName : 'HScrollBar',

        mouseDown : function (e) {
            document.addEventListener
        },

        mouseMove : function (e) {

        },

        mouseUp : function (e) {

        },

//shouldComponentUpdate: fixed x => no update

        render : function () {
            return this.transferPropsTo(
                <svg
                    width={this.props.length}
                    height={this.props.thickness} >
                  <circle
                      cx={this.props.x + this.props.thickness / 2}
                      cy={this.props.y + this.props.thickness / 2}
                      r={this.props.thickness / 2} />
                  <rect
                      width={this.props.length - this.props.thickness}
                      height={this.props.thickness}
                      x={this.props.x + this.props.thickness / 2}
                      y={this.props.y} />
                  <circle
                      cx={this.props.x + this.props.length - this.props.thickness / 2}
                      cy={this.props.y + this.props.thickness / 2}
                      r={this.props.thickness / 2} />
                </svg>
            );
        }
    });
});
