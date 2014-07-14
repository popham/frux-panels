/** @jsx react.DOM */

var react = require('react');
var _ = require('lodash');
var storeItemExclusions = require('./mixin/storeItemExclusions');

    module.exports = react.createClass({
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

// non isMounted => orphan status
// Mouse down => selected
// Orphan mouse into => is visiting (triggered by under element)
// Orphan mouse out of => non visiting (triggered by under element)
// Open slot + mouse over => transition to visiting
// Open slot + mouse out => transition to non visiting

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
            this.setState({
                orphan : null
            });

            this.props.orphansAct.adoption.unvisit();
        },

        mouseUp : function (e) {
            if (this.state.orphan !== null) {
                this.props.orphansAct.adoption.claim();
                this.props.panelsAct.install.push(this.props.key, this.state.orphan);
                this.props.orphansAct.uninstall(this.props.key);
                this.setState({
                    orphan : null
                });
            }
        },

        render : function () {
            if (this.state.orphan === null) {
                return (
                    react.DOM.div(
                        {onMouseOver:this.mouseOver,
                        onMouseOut:this.mouseOut,
                        onMouseUp:this.mouseUp}, 
                      this.props.children
                    )
                );
            } else {
                var props = {};
                _.extend(props, this.storeItemExclusions());
                _.extend(props, orphan.props);

                return (
                    react.DOM.div(
                        {onMouseOver:this.mouseOver,
                        onMouseOut:this.mouseOut,
                        onMouseUp:this.mouseUp}, 
                      orphan.component(props)
                    )
                );
            }
        }
    });

