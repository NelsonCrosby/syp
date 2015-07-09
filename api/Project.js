'use strict'

var _ = require('lodash')

function Project(cfg) {
  Project.validate(cfg, function (e) { if (e) throw e })

  _.assign(this, cfg)
}

Project.validate = function (obj, cb) {
  if (obj.name != null) {
    if (typeof obj.name !== 'string') {
      var err = new Error('The given name ' + JSON.stringify(obj.name) + ' is not a string')
      err.attr = 'name'
      err.problem = 'type'
      cb(err)
    }
  }

  if (obj.path == null) {
    var err = new Error('No path was provided')
    err.attr = 'path'
    err.problem = 'required'
    cb(err)
  } else {
    if (typeof obj.path !== 'string') {
      var err = new Error('The given path ' + JSON.stringify(obj.path) + ' is not a string')
      err.attr = 'path'
      err.problem = 'type'
      cb(err)
    }
  }

  var desc = obj.description
  if (desc != null) {
    if (typeof desc !== 'string') {
      var err = new Error('The given description ' + JSON.stringify(desc) + ' is not a string')
      err.attr = 'description'
      err.problem = 'type'
      cb(err)
    }
  }

  var cats = obj.categories
  if (cats != null) {
    if (!(cats instanceof Array)) {
      var err = new Error('The given categories ' + JSON.stringify(cats) + ' is not an array')
      err.attr = 'categories'
      err.problem = 'type'
      cb(err)
    } else {
      cats.forEach(function (cat, i) {
        if (typeof cat !== 'string') {
          var err = new Error('The category in index ' + i + ' (' + JSON.stringify(cat) + ') is not a string')
          err.attr = 'categories'
          err.problem = 'nested-type'
          err.key = i
          cb(err)
        }
      })
    }
  }
}

module.exports = Project
