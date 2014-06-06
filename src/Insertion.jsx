/** @jsx react.DOM */

var react = require('react');
var merge = require('react/lib/merge');

var Insertion = react.createClass({
    mixins : [require('./mixin/groupMember')],

    propTypes : {
        components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
    },

    render: function () {
        function installer(component) {
            return function (event) {
                var panels = this.props.panelsAct;
                panels.splice(this.props.key, 0, [
                    {
                        cls : Insertion,
                        props : { components : this.props.components }
                    }, {
                        cls : component.cls,
                        props : component.props
                    }
                ]);
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
