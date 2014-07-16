/** @jsx react.DOM */

define(['react', '../mixin/index'], function (react, mixin) {

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

            function panelize(item) {
                var memento = item.value.memento;
                return memento.component(
                    react.addons.update(memento.componentProps, {
                        $merge : this.storeItemExclusions(),
                        $merge : {Host:item.value.Host, key:item.key}
                    })
                );
            }

            return (
                <ul className="frux-panels" style={style} >
                  {this.state.panels.map(panelize, this)}
                </ul>
            );
        }
    });
});