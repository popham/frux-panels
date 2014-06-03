/** @jsx react.DOM */

var react = require('react');
var List = require('../list/Store');
var DragBus = require('../DragBus');

var Insertion = react.createClass({
    propTypes : {
        panels : react.PropTypes.instanceOf(List).isRequired,
        position : react.PropTypes.number.isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus),

        panelClasses : react.PropTypes.arrayOf(react.PropTypes.component).isRequired
    },

    render: function () {
        function installer(PanelClass) {
            return function (event) {
                var panels = this.props.panels;
                var i = this.props.position;

                panels.insert(
                    {
                        cls : PanelClass,
                        key : this.state.nextKey,
                        props : {}
                    },
                    i
                );
                this.setState({ nextKey : this.state.nextKey+1 });

                /*
                 * Configure the new insertion point identically to the one
                 * doing the inserting.
                 */
                panels.insert(
                    {
                        cls : Insertion,
                        key : this.state.nextKey;
                        props : {
                            panelClasses : this.props.panelClasses
                        }
                    },
                    i
                );
                this.setState({ nextKey : this.state.nextKey+1 });
            }.bind(this);
        }.bind(this)

        function iconify(PanelClass) {
            return (
                <li>
                    <img height={this.state.iconHeight}
                         width={this.state.iconWidth}
                         url={panelClass.url()}
                         onClick={installer(PanelClass)} />
                </li>
            );
        }.bind(this)

        return <ul>{this.props.panelClasses.map(iconify, this)}</ul>;
    }
});

module.exports = Insertion;
