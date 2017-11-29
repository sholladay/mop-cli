# mop-cli [![Build status for Mop CLI](https://img.shields.io/circleci/project/sholladay/mop-cli/master.svg "Build Status")](https://circleci.com/gh/sholladay/mop-cli "Builds")

> Lint and maintain many projects at once

Like [ESLint](https://eslint.org) for your entire computer and more than just JavaScript.

## Contents

 - [Why?](#why)
 - [Install](#install)
 - [Usage](#usage)
 - [Rules](#rules)
 - [Data Types](#data-types)
 - [API](#api)
 - [Tips](#tips)
 - [FAQ](#faq)
 - [Related](#related)
 - [Contributing](#contributing)
 - [License](#license)

## Why?

 - Some of us have a lot of modules.
 - We often want to change multiple modules simultaneously.
 - Helps you scale and keep track of todos across projects.
 - Easy maintenance means happy developers and users.

## Install

```sh
npm install mop-cli --global
```

## Usage

```console
$ mop --help

  Usage
    $ mop [rule-name]

  Option
    --cwd       Working directory to search for projects
    --reporter  How to display and stylize results

  Example
    $ mop caret-deps
    $ mop caret-deps --reporter=eslint
```

*Tip: On Node < 7.6, `mop` needs to be `node --harmony "$(which mop)"`*

## Rules

See the [list of rules](doc/README.md) to change what triggers `mop` to complain.

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

Learn more about rules by [creating one](doc/README.md#creating-rules).

#### project

Type: `object`

A [project](#project) for the rule to check.

#### args

Custom arguments for the rule provided by the user in their configuration. Most rules that use this accept just a single `option` object with properties for configuring the rule.

## API

### mop(option)

Returns a `Promise` for an `Array` of [project](#project) results with lists of rule violations.

### option

#### cwd

Type: `string`<br>
Default: `process.cwd()`

Final directory in a downwards search for projects. Only used when no `projects` are provided.

#### projects

Type: `Array<Project>`

List of [projects](#project) to lint.

#### rule

Type: `object`

Map of rules to apply and their arguments. Compatible with [ESLint conventions](https://eslint.org/docs/user-guide/configuring#configuring-rules).

Example:

```js
{
    'caret-deps' : 'warn',
    foo          : ['error', 'blah']
}
```

## Tips

### Enable rules gently

Because Mop checks many projects at once, enabling a single rule can cause many more errors to be reported than in tools like ESLint that check a single project. THis is good, as it gives you a high level view of where fixes are needed. However, when you are initially configuring Mop, you should enable rules one at a time in order to avoid being overwhelmed.

## FAQ

### How is this different than ESLint?

Mop checks every project it can find, whereas ESLint only checks a single project. Mop also doesn't care what language you use, although it is optimized for JavaScript projects. It is actually more like [clinton](https://github.com/SamVerschueren/clinton) than ESLint, but people are more familiar with ESLint, hence the comparison.

## Related

 - [clinton](https://github.com/SamVerschueren/clinton) - Project style linter for individual projects
 - [XO](https://github.com/sindresorhus/xo) - JavaScript linter for individual projects
 - [Stylelint](https://github.com/stylelint/stylelint) - CSS linter for individual projects

## Contributing

See our [contributing guidelines](https://github.com/sholladay/mop-cli/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/mop-cli/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/mop-cli/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/mop-cli/blob/master/LICENSE "License for mop-cli") © [Seth Holladay](https://seth-holladay.com "Author of mop-cli")

Go make something, dang it.
