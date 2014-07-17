/** @jsx react.DOM */

define(['react', '../mixin/host', './fork', './close', './Buttons'], function (
         react,            host,     fork,     close,     Buttons) {

    return react.createClass({
        displayName : 'Static',

        mixins : [host],

        propTypes : {
            heading : react.PropTypes.string.isRequired
        },

        unmount : function (e) {
            fork.bind(this)(e);
            this.props.panelsAct.uninstall(this.props.key);

            e.stopPropagation();
            e.preventDefault();
        },

        render : function () {
            return (
                <li key={this.props.key}
                    className="mount static-mount">
                  <header className="title-bar">
                    <Buttons
                        onUnmount={this.unmount}
                        onFork={fork.bind(this)}
                        onClose={close.bind(this)} />
                    <p>{this.props.heading}</p>
                  </header>
                  {react.Children.only(this.props.children)}
                </li>
            );
        }
    });
});
