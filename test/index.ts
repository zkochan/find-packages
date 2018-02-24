import test = require('tape')
import findPackages from 'find-packages'
import path = require('path')

const fixtures = path.join(__dirname, 'fixtures')

test('finds package', async t => {
  const root = path.join(fixtures, 'one-pkg')
  const pkgs = await findPackages(root)

  t.equal(pkgs.length, 1)
  t.ok(pkgs[0].path)
  t.ok(pkgs[0].manifest)
  t.end()
})

test('finds packages by patterns', async t => {
  const root = path.join(fixtures, 'many-pkgs')
  const pkgs = await findPackages(root, {patterns: ['components/**']})

  t.equal(pkgs.length, 2)
  t.ok(pkgs[0].path)
  t.ok(pkgs[0].manifest)
  t.ok(pkgs[0].manifest.name, 'component-1')
  t.ok(pkgs[1].path)
  t.ok(pkgs[1].manifest)
  t.ok(pkgs[0].manifest.name, 'component-2')
  t.end()
})
