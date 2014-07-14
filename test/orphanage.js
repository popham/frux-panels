describe('Store', function() {
    it('should work', function() {
        var orphanage = require('../lib/orphanage');
        var s = new orphanage.Store();
console.log(s);
        s.install({ props:{}, component:null });

        expect(1).toBe(1);
    });
});
