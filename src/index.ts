import path = require('path')
import readPkg = require('read-pkg')
import globby = require('globby')
import pFilter = require('p-filter')

const DEFAULT_GLOBBY_OPTIONS = {
  ignore: [
    '**/node_modules/**',
    '**/bower_components/**',
    '**/test/**',
    '**/tests/**',
  ]
}

async function findPkgs (
  root: string,
  opts?: { ignore?: string[] }
) {
  const globbyOpts = Object.assign({}, DEFAULT_GLOBBY_OPTIONS, opts, { cwd: root })

  const paths: string[] = await globby(['**/package.json'], globbyOpts)

  return pFilter(
    paths
      .map(path.dirname)
      .map(pkgPath => path.join(root, pkgPath))
      .map(async pkgPath => {
        let manifest
        try {
          manifest = await readPkg(pkgPath, {normalize: false})
          return { path: pkgPath, manifest }
        } catch (err) {
          if (err.code === 'ENOENT') {
            return null
          }
          throw err
        }
      }),
    Boolean
  )
}

// for backward compatibility
findPkgs['default'] = findPkgs

export = findPkgs
