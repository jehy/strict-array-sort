'use strict';

const backupSort = Array.prototype.sort;

function apply(logFunc) {

  // eslint-disable-next-line no-extend-native
  Array.prototype.sort = function (compareFunction) {
    if (!compareFunction) {
      return backupSort.call(this, undefined);
    }
    let loggedShit = false;
    const compareFunctionOverride = (a, b) => {
      const res = compareFunction(a, b);
      if (!loggedShit && Number.isNaN(parseInt(res, 10))) {
        loggedShit = true;
        if (!logFunc) {
          throw new TypeError(`Wrong comparator result in sort function: "${res}"`);
        }
        logFunc(res);
      }
      return res;
    };
    return backupSort.call(this, compareFunctionOverride);
  };
}

function revert()
{
  // eslint-disable-next-line no-extend-native
  Array.prototype.sort = backupSort;
}

module.exports = {apply, revert};
