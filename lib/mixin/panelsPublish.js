define(['react', 'frux-list'], function (react, list) {
    return {
        propTypes : {
            panelsPublish : react.PropTypes.instanceOf(list.Publish).isRequired
        },

        getInitialState : function () { return {
            panelsPublishUnsubscribe : this.props.panelsPublish.items.onValue(
                function (items) {
                    this.setState({ panels : items });
                }.bind(this)
            );
        }; },

        componentWillUnmount : function () {
            this.state.panelsPublishUnsubscribe();
        }
    };
});
