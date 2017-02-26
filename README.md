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

## API

### mop.pinned(cwd)

Returns a `Promise` for an `Array` of projects whose dependencies do not conform to the usual `^1.2.3` pattern.

*This includes non-caret ranges, git dependencies, and more. Suggestions for a better name welcome!*

### mop.outdated(cwd)

Returns a `Promise` for an `Array` of outdated projects.

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
