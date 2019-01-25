import fastGlob = require('fast-glob')
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
  opts?: {
    ignore?: string[],
    patterns?: string[],
  },
) {
  opts = opts || {}
  const globOpts = {...opts, cwd: root }
  globOpts.ignore = opts.ignore || DEFAULT_IGNORE
  globOpts.patterns = opts.patterns
    ? normalizePatterns(opts.patterns)
    : ['**/package.json']

  const paths: string[] = await fastGlob(globOpts.patterns, globOpts)

  return pFilter(
    paths
      .map(path.dirname)
      .map((pkgPath) => path.join(root, pkgPath))
      .map(async (pkgPath) => {
        let manifest
        try {
          manifest = await readPkg({ cwd: pkgPath, normalize: false })
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

function normalizePatterns (patterns: string[]) {
  return patterns.map((pattern) => pattern.replace(/\/?$/, '/package.json'))
}

// for backward compatibility
findPkgs['default'] = findPkgs // tslint:disable-line

export = findPkgs
