/** @jsx react.DOM */

define(['react', '../group/Store', '../mixin/host', './Static'], function (
         react,            Store,            host,     Static) {

    return react.createClass({
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
                // A lot of these props are unneeded since the panel is
                // visiting.  While hovering it renders, but it's not
                // interactive.  I don't see any harm in providing the stuff
                // to appease `isRequired` specs on the props.
                var props = react.addons.update(memento.componentProps, {
                    $merge : this.storeItemExclusions()
                });
                props.hostMemento = Store.emptyHostMemento();
                props.key = this.props.key;

                children = memento.component(props);
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
});
