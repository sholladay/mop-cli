# mop-cli [![Build status for mop-cli on Circle CI.](https://img.shields.io/circleci/project/sholladay/mop-cli/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/mop-cli "Mop CLI Builds")

> Maintain your projects.

## Why?

 - Some of us have a lot of modules.
 - We often want to operate on modules in concert.
 - Easy maintenance means happy developers and users.

## Install

```sh
npm install mop-cli --global
```

## Usage

**NOTE: On Node < 7.6, `mop` needs to be `node --harmony "$(which mop)"`**

```console
$ mop --help

  Usage
    $ mop [pinned | outdated]

  Example
    $ mop pinned
```

## Rules

See the [list of rules](docs/rules.md) to change what triggers `mop` to complain.

## Data types

### Project

A project is an object with `name`, `path` and `pkg` properties.

#### name

Type: `string`

Either `pkg.name` if it is available or the [basename](https://nodejs.org/api/path.html#path_path_basename_path_ext) of the project's `path`.

#### path

Type: `string`

Filepath of the project's root directory.

#### pkg

Type: `object`, `null`

Parsed package.json found within `path`, or `null` if the file is missing. An error will be thrown if the file is present but cannot be read or is invalid.

### Result

A result is a project with additional properties for .

#### problems

Type: `Array<Problem>`

A list of problems the project has, as reported by rules.

#### errors

Type: `Array<Problem>`

Same as `problems`, but only those whose `severity` is `error`.

#### warnings

Type: `Array<Problem>`

Same as `problems`, but only those whose `severity` is `warn`.

### Problem

Each rule may optionally return a problem descriptor, which represents a rule violation.

#### message

Type: `string`

A message describing the problem.

#### path

Type: `string`

Filepath that is responsible for the problem.

#### line

Type: `number`

A positive, zero-based integer within the file where the problem occurred.

#### column

Type: `number`

A positive, zero-based integer within the line where the problem occurred.

#### data

Type: any

Arbitrary data that reporters can use to enhance output.

## API

### mop(option)

#### option

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Final directory in a downwards search for projects. Only used when no `projects` are provided.

##### projects

Type: `Array<Project>`

List of projects to lint.

##### rules

Type: `Array<Rule>`

List of rules to use for validating projects.

## Contributing

See our [contributing guidelines](https://github.com/sholladay/mop-cli/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/mop-cli/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/mop-cli/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/mop-cli/blob/master/LICENSE "The license for mop-cli.") © [Seth Holladay](http://seth-holladay.com "Author of mop-cli.")

Go make something, dang it.
