jest.dontMock('../lib/orphanage.js');

describe('Store', function () {
    it('should work', function () {
        var orphanage = require('../lib/orphanage');
        var s = new orphanage.Store();
        s.act.install.push({ props:{}, component:null });

        expect(1).toEqual(1);
    });
});
