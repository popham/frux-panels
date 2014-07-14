jest.dontMock('../lib/mixin/panel');

var react = require('react');
var panelMixin = require('../lib/mixin/panel');

var Thin = react.createClass({
    displayName : 'Thin',
    mixins : [panelMixin],
    statics : {
        bundle : function (props) { return {
            component : Thin,
            props : props
        }; },
        url : function () {
            return 'http://asdf.com/someImage.jpg';
        }
    },

    getDefaultProps : function () { return {
        intialState : { status : 'ok' },
    }; }
});

describe('Panel', function () {
    jest.dontMock('../lib/GroupPane');
    it('should have mounted status as a member of a group pane', function () {
        var gp = require('../lib/GroupPane');
    });
});
