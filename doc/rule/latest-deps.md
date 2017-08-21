## latest-deps

> Require package.json dependencies to be up to date

This ensures that your dependencies have the latest features and bug fixes.

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
