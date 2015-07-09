'use strict'

var fs = require('fs')
  , path = require('path')
var _ = require('lodash')
var utils = require('./utils')

var load = function (fpath) {
  var config = fs.readFileSync(fpath, { encoding: 'utf8' })
  config = JSON.parse(config)

  if (config.extend != null) {
    var parentPath = path.resolve(path.dirname(fpath), config.extend)
      , parent = load(parentPath)
    config = _.assign({}, parent, config)
  }

  return config
}

exports.load = function () {
  exports.config = load(path.join(utils.HOME, '.syp-cfg.json'))
}
