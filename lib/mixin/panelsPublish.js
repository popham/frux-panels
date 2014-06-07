var Publish = require('frux-list/lib/Publish');

module.exports = {
    propTypes : {
        panelsPublish : react.PropTypes.instanceOf(Publish).isRequired
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
