const path = require('path')
const findPkgs = require('./lib').default

findPkgs(path.join(__dirname, 'test', 'fixture'))
  .then(pkgs => console.log(pkgs))
  .catch(err => console.error(err))
