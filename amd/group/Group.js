/** @jsx react.DOM */

define(['react', '../mixin/index', '../panelize'], function (
         react,      mixin,            panelize) {

    return react.createClass({
        displayName : 'Group',

        mixins : [mixin.panelsPublish, mixin.storeItemExclusions],

        propTypes : {
            heightLink : react.PropTypes.object.isRequired,
            positionLink : react.PropTypes.object.isRequired,
            paneHeight : react.PropTypes.number.isRequired
        },

        componentDidMount : function () {
            var element = this.getDOMNode();
            this.props.heightLink.requestChange(element.offsetHeight);
        },

        componentDidUpdate : function (prevProps, prevState) {
            var contentHeight = this.getDOMNode().offsetHeight;
            if (contentHeight !== this.props.heightLink.value) {
                this.props.heightLink.requestChange(contentHeight);

                var max = Math.max(0, contentHeight - this.props.paneHeight);
                if (this.props.positionLink.value > max) {
                    this.props.positionLink.requestChange(max);
                }
            }
        },

        render : function () {
            var style = {
                margin : 0,
                overflow : "hidden",
                position : "absolute",
                width : "100%",
                top : -this.props.positionLink.value
            };

            return (
                react.DOM.ul( {className:"frux-panels", style:style} , 
                  this.state.panels.map(panelize, this)
                )
            );
        }
    });
});
