var react = require('react');
var affine = require('affine/2d/primitive');
var project = require('../project');

    module.exports = function (e) {
        var rect = this.getDOMNode().getBoundingClientRect();
        var size = new affine.Vector(rect.width, rect.height);

        this.props.orphansAct.install(
            project(new affine.Point(rect.left, rect.top), size),
            size,
            this.props.guestMemento
        );

        e.stopPropagation();
        e.preventDefault();
    };

