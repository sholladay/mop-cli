# Rules

Rules are functions that analyze a project and report any problems they find.

## Example

```js
const isGood = (project, ...args) => {
    if (project.pkg.isAwful) {
        return {
            message : 'Project must be good, not awful'
        };
    }
};
```

## Resources

 - [Available rules](../../doc/README.md#available-rules)
 - [Using rules](../../doc/README.md#using-rules)
 - [Creating rules](../../doc/README.md#creating-rules)
