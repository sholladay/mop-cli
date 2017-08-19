# Mop Documentation

Welcome to `mop`, a system that improves how you write and maintain your projects. First and foremost, it is a linter. You set it up to alert you when projects fail to meet certain criteria that you specify. That way, you end up with consistent, high quality code, documentation, processes, and infrastructure.

What sets this apart from other tools you may have used is that it is also an assistant. You can use `mop` on the command line to answer questions about the current state of all your projects simultaneously. So if you are in the middle of migrating your projects to a new license, for example, `mop` can give you a list of the projects that you still need to do.

## Available rules

You can use rules to change what conditions `mop` will consider acceptable for a given project.

The severity of each rule can be set to `off`, `warn`, or `error`. All rules are off by default so that introducing new rules is not a breaking change. You must enable at least one rule, otherwise `mop` will complain to avoid mistakes.

 - [caret-deps](./rule/caret-deps) - Require package.json dependencies to use `^` caret ranges
 - [clean-repo](./rule/clean-repo) - Require all repository changes to be committed
 - [forbid-files](./rule/forbid-files) - Require a specific set of paths to _not_ exist
 - [has-files](./rule/has-files) - Require a specific set of paths to exist
 - [ignores-deps](./rule/ignores-deps) - Require repoistory to ignore dependencies
 - [on-master](./rule/on-master) - Require repository HEAD to be the `master` branch
 - [pkg-has-keys](./rule/pkg-has-keys) - Require package.json to have certain properties
 - [pkg-key-order](./rule/pkg-key-order) - Require package.json properties to be in a specific order
 - [pulled-repo](./rule/pulled-repo) - Require all remote repository changes to be pulled
 - [pushed-repo](./rule/pushed-repo) - Require all repository commits to be pushed
 - [released-commits](./rule/released-commits) - Require repository HEAD to resolve to a tag
 - [repo-ignores](./rule/repo-ignores) - Require repository to ignore files
 - [semver-deps](./rule/semver-deps) - Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)

## Create a rule

There are a few requirements for naming a rule:

 - It must be a valid module ID that we can import with Node's [require()](http://fredkschott.com/post/2014/06/require-and-the-module-system/)
 - It must be URL safe so that people can easily view and share it

Beyond that, please keep in mind how users will discover your rule. Most of them will see it in a list of other rules. So make it succinct and its intentions obvious.
