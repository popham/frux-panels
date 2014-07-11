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

// non isMounted => orphan status
// Mouse down => selected
// Orphan mouse into => is visiting (triggered by under element)
// Orphan mouse out of => non visiting (triggered by under element)
// Open slot + mouse over => transition to visiting
// Open slot + mouse out => transition to non visiting

        mouseOver : function (e) {
            if (this.isOpen()) {
                this.setState({
                    orphan : this.props.orphansAct.adoption.current
                });

                this.props.orphansAct.adoption.hide();
            }
        },

        mouseOut : function (e) {
            this.setState({
                orphan : null
            });

            this.props.orphansAct.adoption.unhide();
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
            var orphan = this.state.orphan;

            if (orphan === null) {
                return (
                    <div
                        onMouseOver={this.mouseOver}
                        onMouseOut={this.mouseOut}
                        onMouseUp={this.mouseUp}>
                      {this.props.children}
                    </div>
                );
            } else {
                var props = {};
                _.extend(props, this.storeItemExclusions());
                _.extend(props, orphan.props);

                return (
                    <div
                        onMouseOver={this.mouseOver}
                        onMouseOut={this.mouseOut}
                        onMouseUp={this.mouseUp}>
                      {orphan.component(props)}
                    </div>
                );
            }
        }
    });
});
