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
console.log('Slot mouseOver:');
console.log(e);
                    this.props.orphansAct.adoption.visit();
                }

                this.setState({ orphan : orphan });
            }
        },

        mouseOut : function (e) {
console.log('Slot mouseOut:');
console.log(e);
            this.props.orphansAct.adoption.unvisit();

            this.setState({
                orphan : null
            });
        },

        mouseUp : function (e) {
console.log('Slot mouseUp:');
console.log(e);
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
                    react.DOM.div( {onMouseOut:this.mouseOut, onMouseUp:this.mouseUp}, 
                      this.state.orphan.component(props)
                    )
                );
            } else {
                return (
                    react.DOM.div( {onMouseOver:this.mouseOver}, 
                      this.props.children
                    )
                );
            }
        }
    });
});
