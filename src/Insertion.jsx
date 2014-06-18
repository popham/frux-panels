/** @jsx react.DOM */

define(['react', 'lodash', './mixin/groupMember'], function (react, _, groupMember) {
    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [groupMember],

        statics : {
            groupMeta : function (components) { return {
                cls : Insertion,
                props : { components : components }
            }; }
        },

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired,
            iconWidth : react.PropTypes.string,
            iconHeight : react.PropTypes.string,
            className : react.PropTypes.string
        },

        getDefaultProps : function () { return {
            iconWidth : '50px',
            iconHeight : '50px',
            className : 'insertion-point'
        }; },

        render : function () {
            function installer(component) {
                return function (event) {
                    this.props.panelsAct.install.push(this.props.key, component);
                }.bind(this);
            }

            function iconify(component) {
                return (
                    <li>
                        <img height={this.props.iconHeight}
                             width={this.props.iconWidth}
                             src={component.cls.url()}
                             onClick={installer.bind(this)(component)} />
                    </li>
                );
            }

            return (
                <li key={this.props.key} className={this.props.className}>
                    <ul>
                        {this.props.components.map(iconify.bind(this))}
                    </ul>
                </li>
            );
        }
    });

    return Insertion;
});
