/** @jsx react.DOM */

define(['react', './storeItemExclusions'], function (
         react,     storeItemExclusions) {

    return {
        mixins : [storeItemExclusions],

        propTypes : {
            Host : react.PropTypes.component.isRequired,
            initialState : react.PropTypes.object
        },

        getDefaultProps : function () { return {
            initialState : {}
        }; },

        host : function (heading, children) {
            var Host = this.props.Host;

            return (
                Host(
                    {key:this.props.key,
                    memento:this.memento(),
                    heading:heading,
                    panelsAct:this.props.panelsAct,
                    orphansAct:this.props.orphansAct}, 
                  children
                )
            );
        },

        componentWillMount : function () {
            this.setState(this.props.initialState);
        }
    };
});
