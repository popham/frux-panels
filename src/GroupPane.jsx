/** @jsx react.DOM */

define(['react', './Group', './Scrollbar', 'affine/2d/primitive'], function (
         react,     Group,     Scrollbar,   affine) {

    return react.createClass({
        displayName : 'GroupPane',

        mixins : [react.addons.LinkedStateMixin],

        propTypes : {
            panelsStore : react.PropTypes.object.isRequired,
            orphansAct : react.PropTypes.object.isRequired,
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

            var style = { height:"100%", position:"relative" };

            return (
                <div style={style}>
                  <Group
                      panelsPublish={this.props.panelsStore.publish}
                      panelsAct={this.props.panelsStore.act}
                      orphansAct={this.props.orphansAct}
                      heightLink={this.linkState('contentHeight')}
                      positionLink={this.linkState('contentPosition')}
                      paneHeight={h} />
                  <Scrollbar
                      start={new affine.Point(w - t, 0)}
                      end={new affine.Point(w - t, h)}
                      startOffset={0}
                      endOffset={0}
                      contentLength={this.state.contentHeight}
                      thickness={t}
                      positionLink={this.linkState('contentPosition')} />
                </div>
            );
        }
    });
});
