/** @jsx react.DOM */

var react = require('react');
var List = require('frux-list/Store');
var DragBus = require('../DragBus');

var Insertion = react.createClass({
    propTypes : {
        panels : react.PropTypes.instanceOf(List).isRequired,
        position : react.PropTypes.number.isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus),

        panelClasses : react.PropTypes.arrayOf(react.PropTypes.component).isRequired
    },

    render: function () {
        var installer = function (PanelClass) {
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
                        key : this.state.nextKey,
                        props : {
                            panelClasses : this.props.panelClasses
                        }
                    },
                    i
                );
                this.setState({ nextKey : this.state.nextKey+1 });
            }.bind(this);
        }.bind(this);

        var iconify = function (PanelClass) {
            return (
                react.DOM.li(null, 
                    react.DOM.img( {height:this.state.iconHeight,
                         width:this.state.iconWidth,
                         url:panelClass.url(),
                         onClick:installer(PanelClass)} )
                )
            );
        }.bind(this);

        return react.DOM.ul(null, this.props.panelClasses.map(iconify, this));
    }
});

module.exports = Insertion;
