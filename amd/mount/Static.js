/** @jsx react.DOM */

define(['react', '../mixin/host', './fork', './close'], function (
         react,            host,     fork,     close) {

    var Static = react.createClass({
        displayName : 'Static',

        mixins : [host],

        unmount : function (e) {
            this.fork(e);
            this.props.panelsAct.uninstall.push(this.props.key);

            e.stopPropagation();
            e.preventDefault();
        },

        render : function () {
            return (
                react.DOM.li( {key:this.props.key,
                    className:"mount static-mount"}, 
                  Header(
                      {onUnmount:this.unmount.bind(this),
                      onFork:fork.bind(this),
                      onClose:close.bind(this)}, 
                    this.props.heading
                  ),
                  this.props.children
                )
            );
        }
    });

    return Static;
});