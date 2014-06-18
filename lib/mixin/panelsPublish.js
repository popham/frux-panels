define(['react', 'frux-list'], function (react, list) {
    return {
        propTypes : {
            panelsPublish : react.PropTypes.instanceOf(list.Publish).isRequired
        },

        getInitialState : function () { return {
            panels : null,
            panelsPublishUnsubscribe : null
        }; },

        componentWillMount : function () {
            var setState = this.setState;
            var unsubscribe = this.props.panelsPublish.items.onValue(
                function (items) {
                    setState({ panels : items });
                }
            );
            setState({ panelsPublishUnsubscribe : unsubscribe });
        },

        componentWillUnmount : function () {
            this.state.panelsPublishUnsubscribe();
        }
    };
});
