/** @jsx react.DOM */

define(['react', '../mixin/storeItemExclusions', '../mount/Empty'], function (
         react,           storeItemExclusions,             Empty) {

    var Insertion = react.createClass({
        displayName : 'Insertion',

        mixins : [storeItemExclusions],

        propTypes : {
            components : react.PropTypes.arrayOf(react.PropTypes.object).isRequired
        },

        memento : function () { return {
            component : Insertion,
            componentProps : this.props
        }; },

        render : function () {
            function installer(memento) {
                return function (event) {
                    this.props.panelsAct.install(
                        this.props.key,
                        StaticMount,
                        memento
                    );
                }.bind(this);
            }

            function iconify(blob) {
                return (
                    <li>
                      <img
                          height={50}
                          width={50}
                          src={blob.iconUrl}
                          onMouseDown={installer.bind(this)(blob.memento)} />
                    </li>
                );
            }

            return (
                <Empty
                    key={this.props.key}
                    memento={this.memento()}
                    panelsAct={this.props.panelsAct}
                    orphansAct={this.props.orphansAct} >
                  <ul>{this.props.components.map(iconify.bind(this))}</ul>
                </Empty>
            );
        }
    });

    return Insertion;
});
