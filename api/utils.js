'use strict'

var osenv = require('osenv')

// Store the HOME for later use
exports.HOME = osenv.home(function (err, home) {
  exports.HOME = home
})
