## latest-deps

> Require package.json dependencies to be up to date

This ensures that your dependencies are currently satisfying their latest release.

Note that this rule does not check the version on disk (as `npm outdated` does), but rather the version specified in package.json. Further, it only applies to dependencies that are specified using semver. You probably want to combine this with the [semver-deps](#semver-deps) rule to ensure that all of your dependencies are covered.

### Fail

```json
{
    "dependencies" : {
        "handle-quit" : "0.1.0"
    }
}
```

### Pass

```json
{
    "dependencies" : {
        "handle-quit" : "1.0.0"
    }
}
```

### Related

 - [caret-deps](./caret-deps.md) - Require package.json dependencies to use `^` caret ranges
 - [semver-deps](./semver-deps.md) - Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)
