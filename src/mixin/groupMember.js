define(['react', 'frux-list', '../Escrow'], function (
         react,        list,      Escrow) {
    return {
        propTypes : {
            panelsAct : react.PropTypes.object.isRequired,
            panelsEscrow : react.PropTypes.instanceOf(Escrow).isRequired
        },

        groupMemberProps : function () { return {
            panelsAct : this.props.panelsAct,
            panelsEscrow : this.props.panelsEscrow
        }; }
    };
});
