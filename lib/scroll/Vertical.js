/** @jsx react.DOM */

define(['react'], function (react) {
    return react.creactClass({
        displayName : 'VScrollBar',

        render : function () {
            return this.transferPropsTo(
                react.DOM.svg(
                    {width:this.props.thickness,
                    height:this.props.length} , 
                  react.DOM.circle(
                      {cx:this.props.x+this.props.thickness/2,
                      cy:this.props.y+this.props.thickness/2,
                      r:this.props.thickness/2} ),
                  react.DOM.rect(
                      {width:this.props.thickness,
                      height:this.props.length,
                      x:this.props.x,
                      y:this.props.y+this.props.thickness/2} ),
                  react.DOM.circle(
                      {cx:this.props.x+this.props.thickness/2,
                      cy:this.props.y+this.props.length-this.props.thickness,
                      r:this.props.thickness/2} )
                )
            );
        }
    });
});
