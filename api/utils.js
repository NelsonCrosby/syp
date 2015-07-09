'use strict'

var osenv = require('osenv')

exports.HOME = osenv.home(function (err, home) {
  exports.HOME = home
})
