import globby = require('globby')
import pFilter = require('p-filter')
import path = require('path')
import readPkg = require('read-pkg')

const DEFAULT_IGNORE = [
  '**/node_modules/**',
  '**/bower_components/**',
  '**/test/**',
  '**/tests/**',
]

async function findPkgs (
  root: string,
  opts?: { ignore?: string[] },
) {
  opts = opts || {}
  const globbyOpts = {...opts, cwd: root }
  globbyOpts.ignore = opts.ignore || DEFAULT_IGNORE

  const paths: string[] = await globby(['**/package.json'], globbyOpts)

  return pFilter(
    paths
      .map(path.dirname)
      .map((pkgPath) => path.join(root, pkgPath))
      .map(async (pkgPath) => {
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
    Boolean,
  )
}

// for backward compatibility
findPkgs['default'] = findPkgs // tslint:disable-line

export = findPkgs
