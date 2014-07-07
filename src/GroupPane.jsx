/** @jsx react.DOM */

define(['react', './Group', './Scrollbar', 'affine/lib/2d/primitive'], function (
         react,     Group,     Scrollbar,   affine) {

    return react.createClass({
        displayName : 'GroupPane',

        mixins : [react.addons.LinkedStateMixin],

        propTypes : {
            panelsStore : react.PropTypes.object.isRequired,
            dragBus : react.PropTypes.object.isRequired,
            initialWidth : react.PropTypes.number.isRequired,
            initialHeight : react.PropTypes.number.isRequired,
            scrollbarThickness : react.PropTypes.number
        },

        getDefaultProps : function () { return {
            scrollbarThickness : 6
        }; },

        getInitialState : function () { return {
            width : this.props.initialWidth,
            height : this.props.initialHeight,
            contentHeight : 0,
            contentPosition : 0
        }; },

        componentDidMount : function () {
            var element = this.getDOMNode();
            this.setState({
                width : element.offsetWidth,
                height : element.offsetHeight
            });
        },

        render : function () {
            var w = this.state.width;
            var h = this.state.height;
            var t = this.props.scrollbarThickness;

            return (
                <div>
                  <Group
                      panelsPublish={this.props.panelsStore.publish}
                      panelsAct={this.props.panelsStore.act}
                      dragBus={this.props.dragBus}
                      heightLink={this.linkState('contentHeight')} />
                  <Scrollbar
                      start={new affine.Point(w - 2*t, 0)}
                      end={new affine.Point(w - 2*t, h)}
                      startOffset={2*t}
                      endOffset={2*t}
                      contentLength={this.state.contentHeight}
                      thickness={t}
                      positionLink={this.linkState('contentPosition')} />
                </div>
            );
        }
    });
});
