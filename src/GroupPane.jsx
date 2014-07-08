/** @jsx react.DOM */

define(['react', './Group', './Scrollbar', 'affine/lib/2d/primitive'], function (
         react,     Group,     Scrollbar,   affine) {

    return react.createClass({
        displayName : 'GroupPane',

        mixins : [react.addons.LinkedStateMixin],

        propTypes : {
            panelsStore : react.PropTypes.object.isRequired,
            dragBus : react.PropTypes.object.isRequired,
            width : react.PropTypes.number.isRequired,
            height : react.PropTypes.number.isRequired,
            scrollbarThickness : react.PropTypes.number
        },

        getDefaultProps : function () { return {
            scrollbarThickness : 6
        }; },

        getInitialState : function () { return {
            contentHeight : 0,
            contentPosition : 0
        }; },

        render : function () {
            var w = this.props.width;
            var h = this.props.height;
            var t = this.props.scrollbarThickness;

            return (
                <div>
                  <Scrollbar
                      start={new affine.Point(w - 2*t, 0)}
                      end={new affine.Point(w - 2*t, h)}
                      startOffset={t}
                      endOffset={t}
                      contentLength={this.state.contentHeight}
                      thickness={t}
                      positionLink={this.linkState('contentPosition')} />
                  <Group
                      panelsPublish={this.props.panelsStore.publish}
                      panelsAct={this.props.panelsStore.act}
                      dragBus={this.props.dragBus}
                      heightLink={this.linkState('contentHeight')}
                      positionLink={this.linkState('contentPosition')}
                      paneHeight={h} />
                </div>
            );
        }
    });
});
