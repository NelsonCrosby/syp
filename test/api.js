'use strict'

require('should')

describe('API', function () {
  var mockFS = require('mock-fs')
  var syp = require('../api')
    , utils = require('../api/utils')

  var testVar = Math.random()
    , realHome

  before(function () {
    // mock-fs has a problem with my actual HOME.
    // This might also be the case with others; we won't take the risk.
    realHome = utils.HOME
    utils.HOME = 'home'

    // Create the mock FS
    var fs = {}
    fs[utils.HOME] = {
      // `~/.syp-cfg.json` - the main config
      '.syp-cfg.json': JSON.stringify({
        extend: 'extend-test.json',
        X_test_var: testVar
      }),
      // `~/extend-test.json` - test parent config
      'extend-test.json': JSON.stringify({
        extend: 'extend-test-2.json',
        X_test_var: testVar + 1,
        X_test_var_2: testVar + 1
      }),
      // `~/extend-test-2.json` - test grandparent config
      'extend-test-2.json': JSON.stringify({
        X_test_var_2: testVar + 2,
        X_test_var_3: testVar + 2
      })
    }
    // Init the mock FS
    mockFS(fs)
  })

  after(function () {
    // Reset everything back to the way it should be
    mockFS.restore()
    utils.HOME = realHome
  })

  describe('.load()', function () {
    it('should load the default SYP config file', function () {
      syp.load()
      // Should load X_test_var
      syp.config.X_test_var.should.equal(testVar)
    })
    it('should ensure the entire config file is valid')
    it('should load the default SYP index file')
    it('should ensure the entire SYP index file is valid')
    it('should load all SYP index files specified in config')
    it('should not allow any indexes to have duplicate project names')
    it('should load source SYP config files (config.extend)', function () {
      syp.load()
      // Should load parent test vars, but parent vars should not overwrite
      // child vars.
      syp.config.X_test_var.should.equal(testVar)
      syp.config.X_test_var_2.should.equal(testVar + 1)
      syp.config.X_test_var_3.should.equal(testVar + 2)
    })
    it('should load all SYP index files in extend path')
  })

  describe('.ProjectIndex', function () {
    describe('#constructor()', function () {
      it('should instantiate an empty index')
      it('should begin populating the index with passed parameters')
    })

    describe('#load()', function () {
      it('should load the given index-like object as an index')
      it('should ensure the given object is valid')
      it('should complain if any IDs already exist')
    })

    describe('#get()', function () {
      it('should return the project with the given ID')
      it('should not try to guess the project if an ID is not found')
    })

    describe('#whichIndex()', function () {
      it('should return the index where the given ID exists')
    })

    describe('#move()', function () {
      it('should change the index where a given project is held')
      it('should not complain if the given index is the current index')
    })

    describe('#add()', function () {
      it('should insert a project into the index, retrieveable later')
      it('should use a specific index, if asked')
      it('should fail if the project ID exists already')
    })

    describe('#unindex()', function () {
      it('should remove the project from the index')
      it('should return the project that was removed')
      it('should not do anything to the project files')
    })
  })

  describe('.Project', function () {
    describe('#constructor()', function () {
      it('should load all standard attributes', function () {
        var project = new syp.Project({
          name: 'Test project',
          path: '~/Projects/test-project',
          categories: ['Category 1', 'Category 2'],
          description: 'A test project description'
        })

        // Check everything is in it's rightful place
        project.name.should.equal('Test project')
        project.path.should.equal('~/Projects/test-project')
        project.categories.should.have.length(2)
        project.description.should.equal('A test project description')
      })
      it('should ensure the entire object is valid', function () {
        // Path must be required
        ;(function () {
          new syp.Project({ path: null })
        }).should.throw({ attr: 'path', problem: 'required' })
        // Check for type errors
        ;(function () {
          new syp.Project({ name: 1234, path: '~' })
        }).should.throw({ attr: 'name', problem: 'type' })
        ;(function () {
          new syp.Project({ path: 1234 })
        }).should.throw({ attr: 'path', problem: 'type' })
        ;(function () {
          new syp.Project({ description: 1234, path: '~' })
        }).should.throw({ attr: 'description', problem: 'type' })
        ;(function () {
          new syp.Project({ categories: 1234, path: '~' })
        }).should.throw({ attr: 'categories', problem: 'type' })
        // Check for error in nested type
        ;(function () {
          new syp.Project({ categories: ['cat', 1234], path: '~' })
        }).should.throw({ attr: 'categories', problem: 'nested-type', key: 1 })
      })
      it('should fill in any attributes with their defaults')
      it('should register the project with the index, unless told otherwise')
      it("should create any directories that don't already exist")
    })

    describe('#remove()', function () {
      it('should remove all files and directories contained in the project')
      it('should not try to modify the index')
    })
  })
})
