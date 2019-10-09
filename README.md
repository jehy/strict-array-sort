# strict-array-sort

[![npm](https://img.shields.io/npm/v/strict-array-sort.svg)](https://npm.im/strict-array-sort)
[![license](https://img.shields.io/npm/l/strict-array-sort.svg)](https://npm.im/strict-array-sort)
[![Build Status](https://travis-ci.org/jehy/strict-array-sort.svg?branch=master)](https://travis-ci.org/jehy/strict-array-sort)
[![dependencies Status](https://david-dm.org/jehy/strict-array-sort/status.svg)](https://david-dm.org/jehy/strict-array-sort)
[![devDependencies Status](https://david-dm.org/jehy/strict-array-sort/dev-status.svg)](https://david-dm.org/jehy/strict-array-sort?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/jehy/strict-array-sort/badge.svg?branch=master)](https://coveralls.io/github/jehy/strict-array-sort?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jehy/strict-array-sort/badge.svg)](https://snyk.io/test/github/jehy/strict-array-sort)

# The problem

Many developers don't look up 
[documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) quite enough, and sometimes
think that comparator function in `Array.sort` should return boolean and implement
sorting like this:
```
[1,3,2,4,5].sort((a,b)=>a>b);
```
returns
```
[ 1, 2, 3, 4, 5 ]
```
Sometimes it even works if you are lucky.
But comparator function should return positive number, negative
number or zero, otherwise sorting is broken:
```js
[5, 8, 7, 1, 2, 3, 4, 6, 9, 10, 11, 12, 13].sort((a, b) => a > b)
```

returns
```
[ 4, 5, 3, 1, 2, 6, 7, 8, 9, 10, 11, 12, 13 ]
```
Also, there
[were changes in sorting in V8](https://v8.dev/blog/array-sort#accessors-prototype),
and using booleans in comparators is broken even more than it was before.
```js
[1,3,2,4,5].sort((a,b)=>a>b);
```
```

[ 1, 3, 2, 4, 5 ]
```


# Solution

Of cause, you will have to fix your code.
But to fix something, you need to find it at first, yeah?
And sometimes you have a really large codebase to search in.
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

This module overrides `Array.sort` prototype to add check for comparator.

It is pretty dangerous and probably should not be used in production code.
