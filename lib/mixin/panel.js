/** @jsx react.DOM */

var react = require('react');
var storeItemExclusions = require('./storeItemExclusions');

    module.exports = {
        mixins : [storeItemExclusions],

        propTypes : {
            hostMemento : react.PropTypes.object.isRequired,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            initialState : {}
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

            return host(
                hostProps,
                react.DOM.div( {className:"panel-content"}, children)
            );
        },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };

