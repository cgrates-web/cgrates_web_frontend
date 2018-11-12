import { expect } from 'chai';
import { describe, it, context } from 'mocha';
import strToArray from 'cgrates-web-frontend/utils/str-to-array';

describe('Unit | Utility | StrToArray', function () {
  context('set string', function () {
    it('returns array values', function () {
      const str = 'one,two,three';
      expect(Array.isArray(strToArray(str))).to.be.true;
      expect(strToArray(str)[0]).to.eq('one');
      expect(strToArray(str)[1]).to.eq('two');
      expect(strToArray(str)[2]).to.eq('three');
    });
  });
  context('set number', function () {
    it('returns array values', function () {
      const num = 12;
      expect(Array.isArray(strToArray(num))).to.be.true;
      expect(strToArray(num)[0]).to.eq('12');
    });
  });
  context('set array', function () {
    it('returns array values', function () {
      const arr = [23, 44];
      expect(Array.isArray(strToArray(arr))).to.be.true;
      expect(strToArray(arr)[0]).to.eq('23');
      expect(strToArray(arr)[1]).to.eq('44');
    });
  });
  context('set null', function () {
    it('returns empty array', function () {
      expect(strToArray(null).length).to.eq(0);
    });
  });
});
