/** @jsx react.DOM */

var react = require('react');
var _ = require('lodash');
var frux_list = require('frux-list');
var panelize = require('./panelize');
var mixin = require('./mixin/index');

    var Install = function (list) {
        this._list = list;
    };

    Install.prototype.push = function (bundle) {
        this._list._items = this._list._items.clone();
        this._list._items.append([bundle]);
console.log('Orphanage Install:');
console.log(bundle);

        this._list.publish.push();
    };

    var Uninstall = function (list) {
        this._list = list;
    };

    Uninstall.prototype.push = function (key) {
        this._list._items = this._list._items.clone();
        this._list._items.remove(key, 1);
console.log('Orphanage Uninstall:');
console.log(key);

        this._list.publish.push();
    };

    var Adoption = function (list) {
        this._list = list;
        this._current = null;
        this.unselect = function () {
console.log('Orphanage unselect:')
console.log(this._current);
            this._current = null;
            this._list.publish.push();
        }.bind(this); // Bound function to admit listener removal.
    };

    Object.defineProperty(Adoption.prototype, 'current', {
        get : function () {
            return this._current === null ? null : this._list.value(this._current);
        }
    });

    Adoption.prototype.select = function (key) {
        this._current = key;
        this._list.publish.push();
console.log('Orphanage select:');
console.log(key);
    };

    Adoption.prototype.visit = function () {
        if (this._current !== null) {
            this._list._items = this._list._items.clone();

            var bundle = _.extend({}, this._list.value(this._current));
            var props = _.extend({}, bundle.props);
            props.isVisiting = true;
            bundle.props = props;
            this._list._items.replace(this._current, [bundle]);
console.log('Orphanage visit:');
console.log(this._current);

            this._list.publish.push();
        }
    };

    Adoption.prototype.unvisit = function () {
        if (this._current !== null) {
            this._list._item = this._list._items.clone();

            var bundle = _.extend({}, this._list.value(this._current));
            var props = _.extend({}, bundle.props);
            delete props['isVisiting'];
            bundle.props = props;
            this._list._items.replace(this._current, [bundle]);
console.log('Orphanage unvisit:');
console.log(this._current);

            this._list.publish.push();
        }
    };

    Adoption.prototype.claim = function () {
        if (this._current !== null) {
            var current = this._current;
            this._current = null;
console.log('Orphanage claim:');
console.log(current);

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

        render : function () {
            var style = {
                margin : 0,
                padding : 0
            };

            var panel = panelize.bind(null, this.storeItemExclusions());
            return (
                react.DOM.ul( {className:"frux-panels", style:style}, 
                  this.state.panels.map(panel)
                )
            );
        }
    });

    module.exports = {
        Store : Store,
        Orphanage : Orphanage
    };

