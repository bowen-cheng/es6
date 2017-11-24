'use strict';

const assert = require('assert');

describe('Object', function () {
  describe('is() function', function () {
    it('should consider +0 and -0 to be different', function () {
      assert.equal(-0 === 0, true); // There is 1 more bits for the minus sign
      assert.equal(Object.is(-0, 0), false); // correct
    });
    it('should consider NaN to be Nan', function () {
      assert.equal(NaN === NaN, false); // comparing against NaN is always false
      assert.equal(Object.is(NaN, NaN), true); // correct
    });

    describe('assign() function', function () {
      it('should apply mixins to objects', function () {
        const ship = {};
        const shark = {
          bite: function (target) {
            target.hurt = true;
          }
        };
        const laser = {
          pewpew: function (target) {
            target.explode = true;
          }
        };

        // The shark object now actually has a new property (pewpew function)
        Object.assign(shark, laser);

        shark.bite(ship);
        shark.pewpew(ship);

        assert.equal(ship.hurt, true);
        assert.equal(ship.explode, true);
      });
    });

    describe('property initializer shorthand', function () {
      it('should create properties from local variables', function () {
        const model = 'Ford';
        const year = 1991;

        // const Classic = {
        //   model: model,
        //   year: year
        // };
        // same as below
        const Classic = {
          model,
          year
        };

        assert.equal(Classic.model, model);
        assert.equal(Classic.year, year);
      });
    });

    describe('method initializer shorthand', function () {
      it('should create methods using shorthand', function () {
        const server = {
          // getPort: function () {
          //   return 8080;
          // }
          // same as below
          getPort() {
            return 8080;
          }
        };
        assert.equal(server.getPort(), 8080);
      });
    })
  });
});
