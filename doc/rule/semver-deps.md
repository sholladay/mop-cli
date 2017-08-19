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

 - [caret-deps](./caret-deps.md) - Require package.json dependencies to use `^` caret ranges
