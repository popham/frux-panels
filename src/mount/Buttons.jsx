/** @jsx react.DOM */

define(['react', './icon/index'], function (react, icon) {

    var Unmount = icon.Unmount;
    var Fork = icon.Fork;
    var Close = icon.Close;

    return react.createClass({
        displayName : 'Buttons',

        propTypes : {
            onUnmount : react.PropTypes.func,
            onFork : react.PropTypes.func,
            onClose : react.PropTypes.func
        },

        noop : function (e) {
            e.preventDefault();
            e.stopPropagation();
        },

        getDefaultProps : function () { return {
            onUnmount : this.noop,
            onFork : this.noop,
            onClose : this.noop
        }; },

        render : function () {
            var cursor = { cursor : "default" };

            return (
                <div>
                  <Unmount
                      style={cursor}
                      className="icon"
                      onMouseDown={this.props.onUnmount} />
                  <Fork
                      style={cursor}
                      className="icon"
                      onMouseDown={this.props.onFork} />
                  <Close
                      style={cursor}
                      className="icon"
                      onMouseDown={this.props.onClose} />
                </div>
            );
        }
    });
});
