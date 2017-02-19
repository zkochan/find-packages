# find-packages

> Find all packages inside a directory

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
//     pkg: { name: "foo", version: "1.0.0" }
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

[MIT](LICENSE)
