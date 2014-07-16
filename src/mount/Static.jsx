/** @jsx react.DOM */

define(['react', '../mixin/host', './fork', './close', './Header'], function (
         react,            host,     fork,     close,     Header) {

    return react.createClass({
        displayName : 'Static',

        mixins : [host],

        propTypes : {
            heading : react.PropTypes.string.isRequired
        },

        unmount : function (e) {
            this.fork(e);
            this.props.panelsAct.uninstall(this.props.key);

            e.stopPropagation();
            e.preventDefault();
        },

        render : function () {
            return (
                <li key={this.props.key}
                    className="mount static-mount">
                  <Header
                      onUnmount={this.unmount}
                      onFork={fork.bind(this)}
                      onClose={close.bind(this)}>
                    {this.props.heading}
                  </Header>
                  {this.props.children}
                </li>
            );
        }
    });
});
