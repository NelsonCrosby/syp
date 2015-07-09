'use strict'

describe('API', function () {
  describe('.load()', function () {
    it('should load the default SYP config file')
    it('should ensure the entire config file is valid')
    it('should load the default SYP index file')
    it('should ensure the entire SYP index file is valid')
    it('should load all SYP index files specified in config')
    it('should not allow any indexes to have duplicate project names')
    it('should load source SYP config files (config.extend)')
    it('should load all SYP index files in extend path')
  })

  describe('.Index', function () {
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
      it('should load all standard attributes')
      it('should ensure the entire object is valid')
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