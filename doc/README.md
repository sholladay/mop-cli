# Mop Documentation

Welcome to `mop`, a system that improves how you write and maintain your projects. First and foremost, it is a linter. You set it up to alert you when projects fail to meet certain criteria that you specify. That way, you end up with consistent, high quality code, documentation, processes, and infrastructure.

What sets this apart from other tools you may have used is that it is also an assistant. You can use `mop` on the command line to answer questions about the current state of all your projects simultaneously. So if you are in the middle of migrating your projects to a new license, for example, `mop` can give you a list of the projects that still need to be done. And you don't need to babysit it - `mop` can figure out where your projects live all on its own, among other things.

## Contents

 - [Available rules](#available-rules)
 - [Using rules](#using-rules)
 - [Create a rule](#create-a-rule)

## Available rules

 - [caret-deps](./rule/caret-deps.md) - Require package.json dependencies to use `^` caret ranges
 - [clean-repo](./rule/clean-repo.md) - Require all repository changes to be committed
 - [forbid-files](./rule/forbid-files.md) - Require a specific set of paths to _not_ exist
 - [has-files](./rule/has-files.md) - Require a specific set of paths to exist
 - [ignores-deps](./rule/ignores-deps.md) - Require repoistory to ignore dependencies
 - [latest-deps](./rule/latest-deps.md) - Require package.json dependencies to be up to date
 - [on-master](./rule/on-master.md) - Require repository HEAD to be the `master` branch
 - [pkg-has-keys](./rule/pkg-has-keys.md) - Require package.json to have certain properties
 - [pkg-key-order](./rule/pkg-key-order.md) - Require package.json properties to be in a specific order
 - [pulled-repo](./rule/pulled-repo.md) - Require all remote repository changes to be pulled
 - [pushed-repo](./rule/pushed-repo.md) - Require all repository commits to be pushed
 - [released-commits](./rule/released-commits.md) - Require repository HEAD to resolve to a tag
 - [repo-ignores](./rule/repo-ignores.md) - Require repository to ignore files
 - [semver-deps](./rule/semver-deps.md) - Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)

## Using rules

You can use rules to change what conditions `mop` will consider acceptable for a given project.

The severity of each rule can be set to `off`, `warn`, or `error`, which denotes whether the rule will be executed and how `mop` will respond to any violations reported by the rule. All rules are off by default so that introducing a new rule is not a breaking change. You must enable at least one rule, otherwise `mop` will complain to avoid mistakes.

The difference between `warn` and `error` is that `error` is more severe and, in the case of the CLI, will cause `mop` to exit with a non-zero status code.

In your configuration, provide a rule name and your desired severity level.

```js
{
    'my-rule' : 'error'
}
```

If a rule you are using takes [custom arguments](#custom-arguments), you can configure it with an array. The first element is the severity level. All others will be passed to the rule as-is.

```js
{
    'my-rule' : ['error', 'foo', 'bar']
}
```

## Create a rule

First, choose a name. The requirements for naming a rule are as follows.

 - It must be a valid module ID that we can import with Node's [require()](http://fredkschott.com/post/2014/06/require-and-the-module-system/)
 - It must be URL safe so that people can easily view and share it

Beyond that, please keep in mind how users will discover your rule. Most of them will see it in a list of other rules. So make it succinct and its intentions clear.

For the sake of demonstration, we will implement `my-rule`, which is a pretty lousy name.

Save the following snippet inside of `mop` at `lib/rule/my-rule.js`:

```js
'use strict';

const myRule = (project) => {
    // Anything you want in here.
    const shouldFail = true;
    if (shouldFail) {
        return {
            message : 'Oh my!'
        };
    }
};

module.exports = myRule;
```

That is it! Your rule is ready to use.

```console
$ mop my-rule
```

Because the rule always reports a violation, it is pretty useless, and you can expect to see a lot of output.

From here, you can implement your own logic for the rule to analyze the [project](../README.md#project). Just remember to only return an object if the project violates the rule's expectations. You can return any object that has the necessary properties to represent a [problem](../README.md#problem).

You can also report multiple problems at once in an `Array`. It is recommended that if you report multiple problems, you make an effort to sort them such that the most important problems come first. This is to be friendly to the user, given that there may be various limits on how many problems can be displayed to the user at any given time.

Rules can optionally be implemented as an [`async` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) or wrap their return value in a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

### Custom arguments

Sometimes, you may want to allow users to pass arguments to your rule. For example, to configure the rule itself.

In most cases, you should instead make a new rule for each of the common cases or conditional logic branches, as that is more discoverable and readable. However, arguments from users' configuration are always passed to the relevant rule and can be used, where needed.

It is recommended that you use a single `option` object, if possible, for readability. Keep in mind that, at a glance, there is very little context for users to know what your rule is or what it is doing, beyond its name and arguments. So make them read well in the user's configuration.

You can easily collect all of your custom arguments with [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```js
const myRule = (project, ...args) => {
    console.log(args.length);
};
myRule({}, 'foo', 'bar');  // => 2
```

See [using rules](#using-rules) for how to provide the custom arguments as a user.
