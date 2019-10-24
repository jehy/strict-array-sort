'use strict';

const assert = require('assert');
const sinon = require('sinon');

const strictSort = require('../index');

const badComparators = [
  null,
  undefined,
  NaN,
  Infinity,
  true,
  false,
];


const goodComparators = [
  1,
  -1,
  0,
  42,
  3.14,
];

describe('fix array sort', ()=>{
  describe('logic test', ()=>{
    before(()=>{
      strictSort.apply();
    });
    after(()=>{
      strictSort.revert();
    });
    describe('should pass good comparators', ()=>{
      goodComparators.forEach((cmp)=>{
        it(`should pass comparator with result ${cmp}`, ()=>{
          [1, 2].sort(()=>cmp);
        });
      });
      it('should work with default comparator if none passed', ()=>{
        assert.deepEqual(['c', 'b', 'a'].sort(), ['a', 'b', 'c']);
      });
    });
    describe('should fail on bad comparators', ()=>{
      badComparators.forEach((cmp)=>{
        it(`should fail on comparator with result ${cmp}`, ()=>{
          assert.throws(()=>[1, 2].sort(()=>cmp), {name: 'TypeError'});
        });
      });
    });
  });
  describe('logging', ()=>{
    const loggerFunc = sinon.spy();
    before(()=>{
      strictSort.apply(loggerFunc);
    });
    after(()=>{
      strictSort.revert();
    });
    it('should log errors, once for each sort call', ()=>{
      [1, 2, 3, 4, 5].sort(()=>null);
      assert(loggerFunc.calledOnce);
      assert(loggerFunc.withArgs(null).calledOnce);
      [1, 2, 3, 4, 5].sort(()=>NaN);
      assert(loggerFunc.calledTwice);
      assert(loggerFunc.withArgs(NaN).calledOnce);
      [19, 21].sort(()=> NaN);
      assert(loggerFunc.calledThrice);
      assert(loggerFunc.withArgs(NaN, 19, 21).calledOnce);
    });
  });
});
