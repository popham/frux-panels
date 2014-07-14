define(['react', 'lodash', 'frux-list'], function (react, _, list) {
    return {
        propTypes : {
            panelsPublish : react.PropTypes.instanceOf(list.Publish).isRequired
        },

        getInitialState : function () { return {
            panels : null,
            panelsPublishUnsubscribe : null
        }; },

        componentWillMount : function () {
            var unsubscribe = this.props.panelsPublish.items.onValue(
                function (items) {
                    this.setState({ panels : items });
                }.bind(this)
            );

            this.setState({ panelsPublishUnsubscribe : unsubscribe});
        },

        componentWillUnmount : function () {
            this.state.panelsPublishUnsubscribe();
        }
    };
});
