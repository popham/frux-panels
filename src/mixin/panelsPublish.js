define(['react', 'signals'], function (react, signals) {
    return {
        propTypes : {
            panelsPublish : react.PropTypes.instanceOf(signals.Signal).isRequired
        },

        getInitialState : function () { return {
            panels : [],
            panelsPublishUnsubscribe : null
        }; },

        componentWillMount : function () {
            var onPublish = function (items) {
                this.setState({ panels : items });
            }.bind(this);

            this.props.panelsPublish.add(onPublish);

            this.setState({
                panelsPublishUnsubscribe : function() {
                    this.props.panelsPublish.remove(onPublish);
                }.bind(this)
            });
        },

        componentWillUnmount : function () {
            this.state.panelsPublishUnsubscribe();
        }
    };
});
