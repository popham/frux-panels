/** @jsx react.DOM */

define(['react', './storeItemExclusions'], function (
         react,     storeItemExclusions) {

    return {
        mixins : [storeItemExclusions],

        propTypes : {
            hostMemento : react.PropTypes.object.isRequired,
            initialState : react.PropTypes.object,
            pointerEvents : react.PropTypes.string
        },

        getDefaultProps : function () { return {
            initialState : {},
            pointerEvents : 'auto'
        }; },

        host : function (heading, children) {
            var hostMemento = this.props.hostMemento;
            var host = hostMemento.component;
            var hostProps = react.addons.update(hostMemento.componentProps, {
                $merge : {
                    key : this.props.key,
                    guestMemento : this.memento(),
                    heading : heading,
                    panelsAct : this.props.panelsAct,
                    orphansAct : this.props.orphansAct
                }
            });

            var style = { pointerEvents : this.props.pointerEvents };

            return host(
                hostProps,
                <div
                    className="panel-content"
                    style={style}>
                  {children}
                </div>
            );
        },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };
});
