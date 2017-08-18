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

```console
$ mop --help

  Usage
    $ mop [pinned | outdated]

  Example
    $ mop pinned
```

*Tip: On Node < 7.6, `mop` needs to be `node --harmony "$(which mop)"`*

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

---

**Projects are enhanced with the following properties before they are returned to users.**

#### problems

Type: `Array<Problem>`

A list of all rule violations the project is responsible for.

#### errors

Type: `Array<Problem>`

Same as `problems`, but only those whose `severity` is `error`.

#### warnings

Type: `Array<Problem>`

Same as `problems`, but only those whose `severity` is `warn`.

### Problem

Each rule may optionally return a problem descriptor, which represents a rule violation. The only required property is `message`.

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

---

**Problems are enhanced with the following properties before they are returned to users.**

#### ruleId

Type: `string`

The rule that reported the problem.

#### severity

Type: `string`<br>
Example: `warn`

The problem level, as configured by the user for the rule.

### rule(project, ...args)

Returns a [problem](#problem) or an `Array` of problems, optionally wrapped in a `Promise`, if the project violates the expectations of the rule.

It is recommended that if you report multiple problems, you make an effort to sort them such that the most important problems come first. This is to be friendly to the user, given that there may be various limits on how many problems can be displayed to the user at any given time.

#### project

Type: `object`

A [project](#project) for the rule to check.

#### args

Anything you want users to be able to pass to the rule from their configuration. Useful for configuring the rule itself. Please consider whether making a separate rule would be better instead of using this.

It is recommended that you use a single `option` object, if possible, for readability. Keep in mind that, at a glance, there is very little context for users to know what your rule is or what it is doing, beyond its name and arguments. So make them read well in the user's configuration.

You can easily collect all of your custom arguments with the [rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) operator.

```js
const myRule = (project, ...args) => {
    console.log(args.length);
};
myRule({}, 'foo', 'bar');  // => 2
```

## API

### mop(option)

Returns a `Promise` for an `Array` of [project](#project) results with lists of rule violations.

#### option

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Final directory in a downwards search for projects. Only used when no `projects` are provided.

##### projects

Type: `Array<Project>`

List of [projects](#project) to lint.

##### rule

Type: `object`

Map of rules to apply and their arguments. Compatible with [ESLint conventions](https://eslint.org/docs/user-guide/configuring#configuring-rules).

Example:

```js
{
    'caret-deps' : 'warn',
    'foo'        : ['error', 'blah']
}
```

## Contributing

See our [contributing guidelines](https://github.com/sholladay/mop-cli/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/mop-cli/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/mop-cli/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/mop-cli/blob/master/LICENSE "The license for mop-cli.") © [Seth Holladay](https://seth-holladay.com "Author of mop-cli.")

Go make something, dang it.
