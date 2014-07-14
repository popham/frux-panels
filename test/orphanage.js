var assert = require('assert');

describe('Store', function() {
    it('should work', function() {
        var orphanage = require('../lib/orphanage');
        var s = new orphanage.Store();
        s.act.install.push({ props:{}, component:null });

        assert.strictEqual(1,1);
    });
});
