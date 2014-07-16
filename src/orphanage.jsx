/** @jsx react.DOM */

define(['react', 'frux-list', './mixin/index', './mount/Orphan'], function (
         react,   frux_list,     mixin,                 Orphan) {

    var Install = function (list) {
        this._list = list;
    };

    Install.prototype.push = function (hostInitialState, memento) {
        var bundle = {
            hostInitialState : hostInitialState,
            memento : memento
        };

        this._list._items = this._list._items.clone();
        this._list._items.append([bundle]);

        this._list.publish.push();
    };

    var Uninstall = function (list) {
        this._list = list;
    };

    Uninstall.prototype.push = function (key) {
        this._list._items = this._list._items.clone();
        this._list._items.remove(key, 1);

        this._list.publish.push();
    };

    var Adoption = function (list) {
        this._list = list;
        this._current = null;
        this.unselect = function () {
            this._current = null;
            this._list.publish.push();
        }.bind(this); // Bound function to admit listener removal.
    };

    Object.defineProperty(Adoption.prototype, 'currentMemento', {
        get : function () {
            if (this._current === null) return null;

            var bundle = this._list.value(this._current);

            return {
                component : bundle.component,
                componentProps : bundle.componentProps
            };
        }
    });

    Adoption.prototype.select = function (key) {
        this._current = key;
        this._list.publish.push();
    };

    Adoption.prototype.visit = function () {
        if (this._current !== null) {
            this._list._items = this._list._items.clone();

            var bundle = react.addons.update(this._list.value(this._current), {
                memento : {componentProps : {
                    $merge : {isVisiting : true}
                } }
            });
            this._list._items.replace(this._current, [bundle]);

            this._list.publish.push();
        }
    };

    Adoption.prototype.unvisit = function () {
        if (this._current !== null) {
            this._list._item = this._list._items.clone();

            var bundle = react.addons.update(this._list.value(this._current), {
                memento : {componentProps : {
                    $merge : {isVisiting : false}
                } }
            });
            this._list._items.replace(this._current, [bundle]);

            this._list.publish.push();
        }
    };

    Adoption.prototype.claim = function () {
        if (this._current !== null) {
            var current = this._current;
            this._current = null;

            this.uninstall.push(current);
        }
    };

    var Store = function () {
        frux_list.List.call(this, []);

        this.act = {
            install : new Install(this),
            uninstall : new Uninstall(this),
            adoption : new Adoption(this),
        };

        this.publish = new frux_list.Publish(this);
    };

    Store.prototype = Object.create(frux_list.List.prototype);

    var Orphanage = react.createClass({
        displayName : 'Orphanage',

        mixins : [mixin.panelsPublish, mixin.storeItemExclusions],

        componentDidMount : function () {
            document.addEventListener(
                'mouseup',
                this.props.orphansAct.adoption.unselect
            );
        },

        componentWillUnmount : function () {
            document.removeEventListener(
                'mouseup',
                this.props.orphansAct.adoption.unselect
            );
        },

        panelize : function (bundle, key) {
            return bundle.memento.component(
                react.addons.update(bundle.memento.componentProps, {
                    $merge : this.storeItemExclusions(),
                    $merge : {Host : Orphan}
                })
            );
        },

        render : function () {
            var style = {
                margin : 0,
                padding : 0
            };

            var panel = panelize.bind(null, this.storeItemExclusions());
            return (
                <ul className="frux-panels" style={style}>
                  {this.state.panels.map(this.panelize.bind(this))}
                </ul>
            );
        }
    });

    return {
        Store : Store,
        Orphanage : Orphanage
    };
});
