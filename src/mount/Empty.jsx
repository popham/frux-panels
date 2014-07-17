/** @jsx react.DOM */

define(['react', '../mixin/host', './Buttons'], function (
         react,            host,     Buttons) {

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

        shouldComponentUpdate : function (nextProps, nextState) {
            return this.props !== nextProps || this.state !== nextState;
        },

        componentDidUpdate : function () {
            console.log('UPDATED EMPTY');
        },

        render : function () {
            var memento = this.state.orphanMemento;
            if (memento !== null) {
                // Some of these props are unneeded since the panel is visiting.
                // While hovering it renders, but it's not interactive.  I don't
                // see any harm in providing the stuff to appease `isRequired`
                // specs on the props.
                var props = react.addons.update(memento.componentProps, {
                    $merge : this.storeItemExclusions()
                });
                props.hostMemento = Empty.hostMemento();
                props.pointerEvents = 'none';
                props.key = this.props.key;

                return (
                    <li key={this.props.key}
                        className="mount visited-mount"
                        onMouseLeave={this.mouseLeave}
                        onMouseUp={this.mouseUp}>
                      <header className="title-bar">
                        <Buttons />
                        <p>{this.props.heading}</p>
                      </header>
                      {react.Children.only(memento.component(props))}
                    </li>
                );
            } else {
                return (
                    <li key={this.props.key}
                        className="mount empty-mount"
                        onMouseEnter={this.mouseEnter}>
                      {this.props.children}
                    </li>
                );
            }
        }
    });

    return Empty
});
