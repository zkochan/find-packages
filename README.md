# find-packages

> Find all packages inside a directory

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/find-packages.svg)](https://www.npmjs.com/package/find-packages) [![Build Status](https://img.shields.io/travis/zkochan/find-packages/master.svg)](https://travis-ci.org/zkochan/find-packages)
<!--/@-->

## Installation

```sh
npm i -S find-packages
```

## Usage

```js
const path = require('path')
const findPkgs = require('find-packages')

findPkgs(path.join(__dirname, 'test', 'fixture'))
  .then(pkgs => console.log(pkgs))
  .catch(err => console.error(err))
  //> [ { path: '/home/zkochan/src/find-packages/test/fixture/pkg',
  //      manifest: { name: 'foo', version: '1.0.0' } } ]
```

## API

### `findPackages(dir, [opts])`

#### `dir`

The directory in which to search for packages.

#### `opts`

Parameters normally passed to [glob](https://www.npmjs.com/package/glob)

#### `opts.ignore`

Patterns to ignore when searching for packages. By default: `**/node_modules/**`, `**/bower_components/**`, `**/test/**`, `**/tests/**`.

## License

[MIT](./LICENSE) © [Zoltan Kochan](http://kochan.io)
