/** @jsx react.DOM */

define(['react', '../mixin/index', '../mount/Orphan'], function (
         react,      mixin,                  Orphan) {

    return react.createClass({
        displayName : 'Orphanage',

        mixins : [mixin.panelsPublish, mixin.storeItemExclusions],

        render : function () {
            function panelize(item) {
                var memento = item.value.memento;
                var props = react.addons.update(memento.componentProps, {
                    $merge : this.storeItemExclusions()
                });
                props.Host = Orphan;
                props.key = item.key;

                return memento.component(props);
            }

            var style = {
                margin : 0,
                padding : 0
            };

            return (
                <ul className="frux-panels" style={style}>
                  {this.state.panels.map(panelize, this)}
                </ul>
            );
        }
    });
});
