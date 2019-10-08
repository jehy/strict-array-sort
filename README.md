# array-sort-strict

[![npm](https://img.shields.io/npm/v/array-sort-strict.svg)](https://npm.im/array-sort-strict)
[![license](https://img.shields.io/npm/l/array-sort-strict.svg)](https://npm.im/array-sort-strict)
[![Build Status](https://travis-ci.org/jehy/array-sort-strict.svg?branch=master)](https://travis-ci.org/jehy/array-sort-strict)
[![dependencies Status](https://david-dm.org/jehy/array-sort-strict/status.svg)](https://david-dm.org/jehy/array-sort-strict)
[![devDependencies Status](https://david-dm.org/jehy/array-sort-strict/dev-status.svg)](https://david-dm.org/jehy/array-sort-strict?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/jehy/array-sort-strict/badge.svg?branch=master)](https://coveralls.io/github/jehy/array-sort-strict?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/array-sort-strict/badge.svg)](https://snyk.io/test/github/jehy/array-sort-strict)

# The problem

Many developers don't look up documentation quite enough, and sometimes
think that comparator function in Array.sort should return boolean, for example
```
[1,3,2,4,5].sort((a,b)=>a>b);
```

```
[ 1, 2, 3, 4, 5 ]
```
But that's the case! Comparator function should return positive number, negative
number and zero. That's why:

For more complex arrays boolean result stops working:
```js
[5, 8, 7, 1, 2, 3, 4, 6, 9, 10, 11, 12, 13].sort((a, b) => a > b)
```

returns
```
[ 4, 5, 3, 1, 2, 6, 7, 8, 9, 10, 11, 12, 13 ]
```
Also, latest V8 changes sorting, and even simple arrays stopped sorting correctly:
```js
[1,3,2,4,5].sort((a,b)=>a>b);
```
```

[ 1, 3, 2, 4, 5 ]
```


# Solution

Of cause, you will have to fix your code.
But to fix something, you need to find it at first, yeah?
That's when this module will help you. It has two modes:

## Strict mode

All code which returns non numeric values from comparators
will start throwing errors. To enable it, just install
 the module and initialize it like this:
 
 ```js
const strictSort = require('strict-array-sort');
strictSort.apply();
```

## Soft mode

If you don't want to throw errors, and want to just write logs, you can do it too:
```js
const strictSort = require('strict-array-sort');
strictSort.apply((res)=>console.log(`Wrong sort result ${res} on ${new Error().stack}`);
```


## Warning

This module rewrites `Array.sort` prototype to add check for comparator.

It is pretty dangerous and should not be used in production code.
