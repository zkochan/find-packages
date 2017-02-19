# find-packages

> Find all packages inside a directory

[![npm version](https://img.shields.io/npm/v/find-packages.svg)](https://www.npmjs.com/package/find-packages) [![Build Status](https://img.shields.io/travis/zkochan/find-packages/master.svg)](https://travis-ci.org/zkochan/find-packages)

## Installation

```
npm i -S find-packages
```

## Usage

```typescript
import findPackages from 'find-packages'

findPackages(process.cwd())
  .then(pkgs => console.log(pkgs))
// [
//   {
//     path: "/home/john/src/foo",
//     manifest: { name: "foo", version: "1.0.0" }
//   }
// ]
```

## API

### `findPackages(dir, [opts])`

#### `dir`

The directory in which to search for packages.

#### `opts.ignore`

Patterns to ignore when searching for packages. By default: `**/node_modules/**`, `**/bower_components/**`, `**/test/**`, `**/tests/**`.

## License

[MIT](LICENSE) © [Zoltan Kochan](http://kochan.io)
