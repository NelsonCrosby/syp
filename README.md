# Sort Your Projects

If you're anything like me, then you're trying to find a way to
keep your projects organized. You've probably come up with a
system of directories and such, using the filesystem to help you
organize. And if you're like me, then you have probably revised
this system so many times that you can't remember where you had a
project last time you used it, and have to search through a ton
of different directories looking for it.

I ended up getting frustrated at this system. I threw together a
CLI tool in Python that was designed to keep a track of my
projects, give them some extra info, and allow me to search them.

It was a good start, but the existing code-base wouldn't stand
the test of time. It needed an API, not just a CLI. It needed
documentation. It needed a rewrite.

So, I'm rewriting it.


## Usage

```bash
# Install
~$ npm install -g syp
# Install shortcut for `cd`ing into a project
~$ syp --get-bash-shortcut cdp >>~/.bashrc
~$ source ~/.bashrc
# Load an existing project into the index
~$ syp import <my_existing_project_dir>
# Create a new project
~$ syp new
Project ID: some-unique-identifier
Directory (~/Projects/some-unique-identifier):
Name: Some Project
Categories: Example
          : Some Category
          :
Description: This is an example project
~$ syp info --path some-unique-identifier
~/Projects/some-unique-identifier
# If you installed the cd shortcut:
~$ cdp some-unique-identifier
# If you are in a project directory, you don't have to specify
# the project ID to perform operations.
~/Projects/some-unique-identifier$ syp info
Some Project (some-unique-identifier)
  ~/Projects/some-unique-identifier
  Example, Some Category
  This is an example project
~/Projects/some-unique-identifier$ cd
# Delete the entire project
~$ syp rm some-unique-identifier
```


## Format

All persistence is stored in JSON files. Any keys not
recognized should be ignored. Implementations may define their
own keys, which should start with `X_`.


### Config file

The main SYP config file exists at `~/.syp-cfg.json`. The
following properties are available (any properties not provided
should be set to their default):

| Property | Default | Type | Purpose |
| --- | --- | --- | --- |
| `"extend"` | `null` | `String` | A path to a SYP config file. The provided file should be loaded, then the current file should extend it. All indexes in an extend chain should be loaded. |
| `"index"` | `"./.syp-index.json"` | `String` or `Array of String` | A path (or array of paths) to a SYP index file(s). |


### Index file

SYP stores all information related to projects in index files.
An index file is an `Object`, where the keys are Project IDs
and the values are `Project` objects. A `Project` object has
the following standard properties:

| Property | Default | Type | Purpose |
| --- | --- | --- | --- |
| `"path"` | (required) | `String` | The path to the project directory. |
| `"name"` | `null` | `String` | A human-readable name for the project. |
| `"categories"` | `[]` | `Array of String` | Some short, classifying strings. |
| `"description"` | `""` | `String` | A reminder of the purpose of the project. Shouldn't be much more than a couple of sentences. |
