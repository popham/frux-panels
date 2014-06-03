/** @jsx react.DOM */

var react = require('react');
var merge = require('react/lib/merge');
var List = require('frux-list/lib/Store');
var DragBus = require('../DragBus');

var Insertion = react.createClass({
    propTypes : {
        panels : react.PropTypes.instanceOf(List).isRequired,
        position : react.PropTypes.number.isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus),

        components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
    },

    statics : function () { return {
        join : function (main, secondary) {
            var mainCs = main.props.components;
            var secondaryCs = secondary.props.components;

            // Only join if both are insertion points.
            if (mainCs && secondaryCs) {
                return {
                    cls : Insertion,
                    key : main.key,
                    props : merge(mainCs, secondaryCs)
                };
            }
        }
    }; },

    render: function () {
        function installer(component) {
            return function (event) {
                var panels = this.props.panels;
                var i = this.props.position;

                panels.insert(
                    {
                        cls : component.cls,
                        key : this.state.nextKey,
                        props : component.props
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
                            components : this.props.components.slice(0);
                        }
                    },
                    i
                );
                this.setState({ nextKey : this.state.nextKey+1 });
            }.bind(this);
        }

        function iconify(component) {
            return (
                <li>
                    <img height={this.state.iconHeight}
                         width={this.state.iconWidth}
                         url={component.cls.url()}
                         onClick={installer.bind(this)(component)} />
                </li>
            );
        }

        return <ul>{this.props.components.map(iconify.bind(this))}</ul>;
    }
});

module.exports = Insertion;
