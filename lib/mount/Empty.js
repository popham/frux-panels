/** @jsx react.DOM */

var react = require('react');
var host = require('../mixin/host');
var Identity = require('./Identity');
var Buttons = require('./Buttons');

    var Empty = react.createClass({
        displayName : 'Empty',

        mixins : [host],

        statics : {
            hostMemento : function () { return {
                component : Empty,
                componentProps : {}
            }; }
        },

        getInitialState : function () { return {
            orphanMemento : null
        }; },

        mouseEnter : function (e) {
            if (this.state.orphanMemento !== null) return;

            this.props.orphansAct.adoption.visit();
            this.setState({
                orphanMemento : this.props.orphansAct.adoption.currentMemento
            });
        },

        mouseLeave : function (e) {
            this.props.orphansAct.adoption.unvisit();
            this.setState({ orphanMemento : null });
        },

        mouseUp : function (e) {
            var memento = this.state.orphanMemento;

            if (memento !== null) {
                this.props.orphansAct.adoption.claim();
                this.props.panelsAct.install(this.props.key, memento);
            }
        },

        render : function () {
            var memento = this.state.orphanMemento;
            if (memento !== null) {
                var props = react.addons.update(this.storeItemExclusions(), {
                    $merge : {hostMemento : Identity.hostMemento()}
                });
                props.key = this.props.key;

                style = {pointerEvents : 'none'};

                return (
                    react.DOM.li( {key:this.props.key,
                        className:"mount visited-mount",
                        onMouseLeave:this.mouseLeave,
                        onMouseUp:this.mouseUp}, 
                      react.DOM.header( {className:"title-bar", style:style}, 
                        Buttons(null ),
                        react.DOM.p(null, this.props.heading)
                      ),
                      react.DOM.div( {style:style}, 
                        memento.component(props)
                      )
                    )
                );
            } else {
                return (
                    react.DOM.li( {key:this.props.key,
                        className:"mount empty-mount",
                        onMouseEnter:this.mouseEnter}, 
                      this.props.children
                    )
                );
            }
        }
    });

    module.exports = Empty

