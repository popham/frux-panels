define([], function () {

    return function (e) {
        this.props.panelsAct.uninstall.push(this.props.key);

        e.stopPropagation();
        e.preventDefault();
    };
});
