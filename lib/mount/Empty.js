/** @jsx react.DOM */

var react = require('react');
var host = require('../mixin/host');
var Static = require('./Static');

    module.exports = react.createClass({
        displayName : 'Empty',

        mixins : [host],

        getInitialState : function () { return {
            orphanMemento : null
        }; },

        mouseEnter : function (e) {
            this.props.orphansAct.adoption.visit();
            this.setState({
                orphanMemento : this.props.orphansAct.adoption.currentMemento
            });
        },

        mouseOut : function (e) {
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
            var classes = ["mount", "empty-mount"];
            var children = this.props.children;

            var memento = this.state.orphanMemento;
            if (memento !== null) {
                children = memento.component(memento.componentProps);
                classes.push("visited");
            }

            return (
                react.DOM.li( {key:this.props.key,
                    className:classes.join(' '),
                    onMouseEnter:this.mouseEnter,
                    onMouseOut:this.mouseOut,
                    onMouseUp:this.mouseUp}, 
                  children
                )
            );
        }
    });

