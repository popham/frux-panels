/** @jsx react.DOM */

var react = require('react');
var host = require('../mixin/host');

    var Empty = react.createClass({
        displayName : 'Empty',

        mixins : [host],

        getInitialState : function () { return {
            orphanMemento : null
        }; },

        dragEnter : function (e) {
            this.props.orphanAct.adoption.visit();
            this.setState({
                orphanMemento : this.props.orphansAct.adoption.currentMemento
            });
        },

        dragLeave : function (e) {
            this.props.orphanAct.adoption.unvisit();
            this.setState({ orphanMemento : null });
        },

        drop : function (e) {
            var memento = this.state.orphanMemento;

            if (memento !== null) {
                this.props.orphansAct.adoption.claim();
                this.props.panelsAct.install.push(
                    this.props.key,
                    StaticMount,
                    memento
                );
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
                    onDragEnter:this.dragEnter.bind(this),
                    onDragLeave:this.dragLeave.bind(this),
                    onDrop:this.drop.bind(this)}, 
                  children
                )
            );
        }
    });

    module.exports = Empty;

