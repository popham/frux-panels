/** @jsx react.DOM */

define(['react', './storeItemExclusions'], function (
         react,     storeItemExclusions) {

    return {
        mixins : [storeItemExclusions],

        propTypes : {
            hostMemento : react.PropTypes.object.isRequired,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            initialState : {}
        }; },

        heading : function () { return this.refs.host.heading(); },

        host : function (heading, children) {
            var hostMemento = this.props.hostMemento;
            var hostProps = react.addons.update(hostMemento.componentProps, {
                $merge : {
                    key : this.props.key,
                    ref : 'host',
                    guestMemento : this.memento(),
                    heading : heading,
                    panelsAct : this.props.panelsAct,
                    orphansAct : this.props.orphansAct
                }
            });

            return hostMemento.component(
                hostProps,
                <div className="panel-content">{children}</div>
            );
        },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };
});
