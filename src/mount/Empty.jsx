/** @jsx react.DOM */

define(['react', '../mixin/host', './Static'], function (
         react,            host,     Static) {

    return react.createClass({
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
                <li key={this.props.key}
                    className={classes.join(' ')}
                    onDragEnter={this.dragEnter}
                    onDragLeave={this.dragLeave}
                    onDrop={this.drop}>
                  {children}
                </li>
            );
        }
    });
});
