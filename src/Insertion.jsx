/** @jsx react.DOM */

define(['react', 'lodash', './mixin/groupMember'], function (react, _, groupMember) {
    var Insertion = react.createClass({
        mixins : [groupMember],

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired,
            componentBaselineProps : react.PropTypes.object.isRequired,
            iconWidth : react.PropTypes.string,
            iconHeight : react.PropTypes.string
        },

        getDefaultProps : function () { return {
            iconWidth : '50px',
            iconHeight : '50px'
        }; },

        render : function () {
            function installer(component) {
                return function (event) {
                    var props = _.extend({}, this.props.componentBaselineProps);
                    _.extend(props, component.props);

                    this.props.panelsAct.splice(this.props.key, 0, [{
                        cls : Insertion,
                        props : { components : this.props.components }
                    }, {
                        cls : component.cls,
                        props : props
                    }]);
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

            return <ul>{this.props.components.map(iconify.bind(this))}</ul>;
        }
    });

    return Insertion;
});
