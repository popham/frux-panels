/** @jsx react.DOM */

define(['react', './icon/index'], function (react, icon) {

    var Unmount = icon.Unmount;
    var Fork = icon.Fork;
    var Close = icon.Close;

    return react.createClass({
        displayName : 'Header',

        propTypes : {
            onUnmount : react.PropTypes.func.isRequired,
            onFork : react.PropTypes.func.isRequired,
            onClose : react.PropTypes.func.isRequired
        },

        render : function () {
            var moveCursor = { cursor : "move" };
            var cursor = { cursor : "default" };

            return (
                <header
                    style={moveCursor}
                    className="title-bar">
                  <div>
                    <Unmount
                        style={cursor}
                        className="icon"
                        onMouseDown={unmount} />
                    <Fork
                        style={cursor}
                        className="icon"
                        onMouseDown={fork} />
                    <Close
                        style={cursor}
                        className="icon"
                        onMouseDown={close} />
                  </div>
                  <p style={moveCursor}>{this.props.children}</p>
                </header>
            );
        }
    });
});
