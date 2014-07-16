var react = require('react');
var affine = require('affine/2d/primitive');
var project = require('../project');

    module.exports = function (e) {
        var rect = this.getDOMNode().getBoundingClientRect();
        var size = new affine.Vector(rect.offsetWidth, rect.offsetHeight);

        var orphanState = {
            position : project(new affine.Point(rect.left, rect.top), size),
            size : size,
            isVisiting : false
        };

        this.props.orphansAct.install.push(orphanState, this.props.memento);

        e.stopPropagation();
        e.preventDefault();
    };

