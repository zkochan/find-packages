import path = require('path')
import readPkg = require('read-pkg')
import globby = require('globby')
import pFilter = require('p-filter')

const DEFAULT_IGNORE = [
  '**/node_modules/**',
  '**/bower_components/**',
  '**/test/**',
  '**/tests/**',
]

export default async function findPkgs (
  root: string,
  opts?: { ignore?: string[] }
) {
  opts = opts || {}
  const ignore = opts.ignore || DEFAULT_IGNORE

  const paths: string[] = await globby(['**/package.json'], {
    ignore,
    cwd: root
  })

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
