# Rules

You can use rules to change what conditions `mop` will consider acceptable for a given project.

The severity of each rule can be set to `off`, `warn`, or `error`. All rules are off by default so that introducing new rules is not a breaking change. You must enable at least one rule, otherwise `mop` will complain to avoid mistakes.

## semver-deps

> Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)

This ensures that your dependencies are coming from a proper registry, with all the usual benefits they bring. For example, most registries guarantee the release tarball is immutable for a given version. And by using semver, you can opt-in to specific types of updates with version ranges.

### Fail

```json
{
    "dependencies" : {
        "handle-quit" : "git@github.com:sholladay/handle-quit.git"
    }
}
```

### Pass

```json
{
    "dependencies" : {
        "handle-quit" : "^1.0.0"
    }
}
```

### Related

 - caret-deps - Require package.json dependencies to use `^` caret ranges

## caret-deps

> Require package.json dependencies to use `^` caret ranges

This ensures that your dependencies are installed with the latest features and fixes as they become available.

Note that this rule only applies to dependencies that are specified using semver. You probably want to combine this with the [semver-deps](#semver-deps) rule to ensure that all of your dependencies are covered.

### Fail

```json
{
    "dependencies" : {
        "handle-quit" : "1.0.0"
    }
}
```

### Pass

```json
{
    "dependencies" : {
        "handle-quit" : "^1.0.0"
    }
}
```

### Related

 - semver-deps - Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)

## clean-repo

> Require all repository changes to be committed

This ensures that pushing would share all of your current work, which makes your test results more useful and helps to prevent releasing broken code.

## pulled-repo

> Require all remote repository changes to be pulled

This ensures that you are working with the latest code, which makes your test results more useful and helps to prevent releasing broken code.

## pushed-repo

> Require all repository commits to be pushed

This ensures that everyone is using the same code as you, which makes your test results more useful.

## released-commits

> Require repository HEAD to resolve to a tag

This ensures that all of your work is released, which is when it is the most useful.

## on-master

> Require repository HEAD to be the `master` branch

This ensures that you are working on the branch where releases are made, so your work doesn't get forgotten.

## repo-ignores

> Require repository to ignore files

## ignores-deps

> Require repoistory to ignore dependencies

This ensures that `node_modules` is never commited. It is generally best to install dependencies from scratch on each machine because they may need to be compiled for a specific operating system.

## has-files

> Require a specific set of paths to exist

This ensures the presence of one or more files in a project.

### Related

 - disallow-files - Require a specific set of paths to _not_ exist

## disallow-files

> Require a specific set of paths to _not_ exist

### Related

 - has-files - Require a specific set of paths to exist

## pkg-has-keys

> Require package.json to have certain properties

## pkg-key-order

> Require package.json properties to be in a specific order
