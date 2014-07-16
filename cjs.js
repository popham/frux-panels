exports.group = {
    Store : require('./lib/group/Store'),
    Insertion : require('./lib/group/Insertion'),
    install : require('./lib/install/group'),
};
exports.orphanage = { install : require('./lib/install/orphanage') };
exports.mixin = require('./lib/mixin/index');
