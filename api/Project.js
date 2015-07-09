'use strict'

var _ = require('lodash')

// Constructor for `Project`s. Throws an error if the passed object is invalid.
function Project(cfg) {
  Project.validate(cfg, function (e) { if (e) throw e })

  _.assign(this, cfg)
}

// Ensures `obj` will be a valid object.
// Unless you want to use `try {} catch () {}`, you should use this function
// before you pass something to `new Project()`, as the callback is called
// synchronously and you can catch errors the conventional JS way.
Project.validate = function (obj, cb) {
  // If name exists, it must be a string
  if (obj.name != null) {
    if (typeof obj.name !== 'string') {
      var err = new Error('The given name ' + JSON.stringify(obj.name) + ' is not a string')
      err.attr = 'name'
      err.problem = 'type'
      cb(err)
    }
  }

  // Path must exist and be a string
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
  // If desc exists, it must be a string
  if (desc != null) {
    if (typeof desc !== 'string') {
      var err = new Error('The given description ' + JSON.stringify(desc) + ' is not a string')
      err.attr = 'description'
      err.problem = 'type'
      cb(err)
    }
  }

  var cats = obj.categories
  // If categories exist, must be an array of strings
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
