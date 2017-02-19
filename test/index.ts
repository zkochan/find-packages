import test = require('tape')
import findPackages from '../src'
import path = require('path')

test('finds package', async t => {
  const root = path.join(__dirname, 'fixture')
  const pkgs = await findPackages(root)

  t.equal(pkgs.length, 1)
  t.ok(pkgs[0].path)
  t.ok(pkgs[0].manifest)
  t.end()
})
