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

 - [semver-deps](./semver-deps.md) - Require package.json dependencies to use [semver](https://docs.npmjs.com/getting-started/semantic-versioning)
