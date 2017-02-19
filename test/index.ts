import test = require('tape')
import findPackages from '../src'
import path = require('path')

test('finds package', async t => {
  const pkgs = await findPackages(path.join(__dirname, 'fixture'))

  t.equal(pkgs.length, 1)
  t.end()
})
