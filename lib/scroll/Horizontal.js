/** @jsx react.DOM */

define(['react'], function (react) {
    return react.creactClass({
        displayName : 'HScrollBar',

        render : function () {
            return this.transferPropsTo(
                react.DOM.svg(
                    {width:this.props.length,
                    height:this.props.thickness} , 
                  react.DOM.circle(
                      {cx:this.props.x + this.props.thickness / 2,
                      cy:this.props.y + this.props.thickness / 2,
                      r:this.props.thickness / 2} ),
                  react.DOM.rect(
                      {width:this.props.length - this.props.thickness,
                      height:this.props.thickness,
                      x:this.props.x + this.props.thickness / 2,
                      y:this.props.y} ),
                  react.DOM.circle(
                      {cx:this.props.x + this.props.length - this.props.thickness / 2,
                      cy:this.props.y + this.props.thickness / 2,
                      r:this.props.thickness / 2} )
                )
            );
        }
    });
});
