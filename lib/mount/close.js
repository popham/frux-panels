

    module.exports = function (e) {
        this.props.panelsAct.uninstall.push(this.props.key);

        e.stopPropagation();
        e.preventDefault();
    };

