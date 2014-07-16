define([], function () {

    return function (e) {
        this.props.panelsAct.uninstall(this.props.key);

        e.stopPropagation();
        e.preventDefault();
    };
});
