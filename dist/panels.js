(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.DragBus = require('./lib/DragBus');
exports.group = require('./lib/install/group');

},{"./lib/DragBus":2,"./lib/install/group":5}],2:[function(require,module,exports){
var bacon = require('baconjs');

var Act = function () {
    this.streams = {
        drag : new bacon.Bus(),
        drop : new bacon.Bus()
    };
};

Act.prototype.drag = function (list, position) {
    this.streams.drag.push({
        list : list,
        position : position
    });
};

Act.prototype.drop = function (list, position) {
    this.streams.drop.push({
        list : list,
        position : position
    });
};

module.exports = function () {
    this.act = new Act();
    this.publish = {
        drag : this.act.streams.drag.toProperty(),
        drop : this.act.streams.drop.toProperty()
    };
};

},{}],3:[function(require,module,exports){
/** @jsx react.DOM */

var react = require('react');
var extend = require('xtend');
var Insertion = require('./Insertion');

module.exports = react.createClass({
    mixins : [require('./mixin/panelsPublish'), require('./mixin/groupMember')],

    /**
     * @param {object} props - Non-standard props for `PanelClass` consumption,
     * e.g. the `panelClasses` prop of `Insertion`.
     */
    appendPanel : function (PanelClass, nonBaselineProps) {
        var props = extend(nonBaselineProps, {
            panelsPublish : this.props.panelsPublish,
            panelsAct : this.props.panelsAct,
            dragBus : this.props.dragBus
        });

        this.props.panelsAct.append([{
            cls : PanelClass,
            props : props
        }]);
    },

    appendInsertion : function (components) {
        this.props.panelsAct.append([{
            cls : Insertion,
            props : { components : components }
        }]);
    },

    render : function () {
        function panelize(panel, key) {
            var props = extend(panel.props, {
                panelsAct : this.props.panelsAct,
                dragBus : this.props.dragBus
            });

            return react.DOM.li( {key:key}, panel.cls(props));
        }

        return react.DOM.ul(null, this.state.panels.map(panelize.bind(this)));
    }
});

},{"./Insertion":4,"./mixin/groupMember":6,"./mixin/panelsPublish":7,"xtend":8}],4:[function(require,module,exports){
/** @jsx react.DOM */

var react = require('react');

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
                react.DOM.li(null, 
                    react.DOM.img( {height:this.state.iconHeight,
                         width:this.state.iconWidth,
                         url:component.cls.url(),
                         onClick:installer.bind(this)(component)} )
                )
            );
        }

        return react.DOM.ul(null, this.props.components.map(iconify.bind(this)));
    }
});

module.exports = Insertion;

},{"./mixin/groupMember":6}],5:[function(require,module,exports){
/** @jsx react.DOM */

var Group = require('../Group');

module.exports = function (element, panelsStore, dragBus) {
    var group = Group( {panelsPublish:panelsStore.publish,
                       panelsAct:panelsStore.act,
                       dragBus:dragBus} );

    react.renderComponent(group, element);

    return group;
};

},{"../Group":3}],6:[function(require,module,exports){
var react = require('react');
var list = require('frux-list');
var DragBus = require('../DragBus');

module.exports = {
    propTypes : {
        panelsAct : react.PropTypes.instanceOf(list.Act).isRequired,
        dragBus : react.PropTypes.instanceOf(DragBus)
    }
};

},{"../DragBus":2}],7:[function(require,module,exports){
var list = require('frux-list');

module.exports = {
    propTypes : {
        panelsPublish : react.PropTypes.instanceOf(list.Publish).isRequired
    },

    getInitialState : function () { return {
        title : '',
        panels : null,
        panelsPublishUnsubscribe : null
    }; },

    componentWillMount : function () {
        var unsubscribe = this.props.panelsPublish.items.subscribe(
            function (items) {
                this.setState({ panels : items });
            }.bind(this)
        );

        this.setState({ panelsPublishUnsubscribe : unsubscribe });
    },

    componentWillUnmount : function () {
        this.state.panelsPublishUnsubscribe();
        this.setState({ panels : null });
        this.setState({ panelsPublishUnsubscribe : null });
    }
};

},{}],8:[function(require,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],9:[function(require,module,exports){

},{}]},{},[1])