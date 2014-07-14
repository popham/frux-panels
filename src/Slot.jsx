/** @jsx react.DOM */

define(['react', 'lodash', './mixin/storeItemExclusions'], function (
         react,        _,           storeItemExclusions) {

    return react.createClass({
        displayName : 'Slot',

        mixins : [storeItemExclusions],

        propTypes : {
            isPlaceholder : react.PropTypes.bool.isRequired
        },

        getInitialState : function () { return {
            orphan : null
        }; },

        isOpen : function () {
            return this.props.isPlaceholder;
        },

        isVisited : function () {
            return this.state.orphan !== null;
        },

        mouseOver : function (e) {
            if (this.isOpen()) {
                var orphan = this.props.orphansAct.adoption.current;

                if (orphan !== null) {
                    this.props.orphansAct.adoption.visit();
                }

                this.setState({ orphan : orphan });
            }
        },

        mouseOut : function (e) {
            this.props.orphansAct.adoption.unvisit();

            this.setState({
                orphan : null
            });
        },

        mouseUp : function (e) {
            if (this.isVisited()) {
                this.props.orphansAct.adoption.claim();
                this.props.panelsAct.install.push(this.props.key, this.state.orphan);
                this.props.orphansAct.uninstall(this.props.key);
                this.setState({
                    orphan : null
                });
            }
        },

        render : function () {
            var orphan = this.state.orphan;

            if (this.isVisited()) {
                var props = {};
                _.extend(props, this.storeItemExclusions());
                _.extend(props, this.state.orphan.props);

                return (
                    <div onMouseOut={this.mouseOut} onMouseUp={this.mouseUp}>
                      {this.state.orphan.component(props)}
                    </div>
                );
            } else {
                return (
                    <div onMouseOver={this.mouseOver}>
                      {this.props.children}
                    </div>
                );
            }
        }
    });
});
