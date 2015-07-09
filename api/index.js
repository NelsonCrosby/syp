'use strict'

var fs = require('fs')
  , path = require('path')
var _ = require('lodash')
var utils = require('./utils')

// Load a config located at `fpath`.
// TODO: validate config
var load = function (fpath) {
  var config = fs.readFileSync(fpath, { encoding: 'utf8' })
  config = JSON.parse(config)

  // Load data from the parent.
  // Parent data should not overwrite child data.
  if (config.extend != null) {
    var parentPath = path.resolve(path.dirname(fpath), config.extend)
      , parent = load(parentPath)
    config = _.assign({}, parent, config)
  }

  return config
}

// Loads the default config
exports.load = function () {
  // Load the default config file into the main config var
  exports.config = load(path.join(utils.HOME, '.syp-cfg.json'))
}

exports.Project = require('./Project')
