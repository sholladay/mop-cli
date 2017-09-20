import test from 'ava';
import caretDeps from './lib/rule/caret-deps';

const makePackage = (pkg) => {
    return { pkg };
};

test('rule: caret-deps', (t) => {
    t.falsy(caretDeps({}), 'must ignore non-packages');
    t.falsy(caretDeps(makePackage({})), 'must ignore empty packages');
    t.falsy(caretDeps(makePackage({ dependencies : {} })), 'must ignore packages with no dependencies');

    const nonSemver = makePackage({
        dependencies : {
            'build-path' : 'git@github.com:sholladay/build-path.git',
            'build-data' : 'sholladay/build-data',
            'build-keys' : 'latest',
            'build-dir'  : './directory',
            scube        : 'file:../foo/bar',
            delivr       : 'https://example.com/ball.tar.gz'
        }
    });
    t.falsy(caretDeps(nonSemver), 'must ignore non-semver dependencies');

    const caret = makePackage({
        dependencies : {
            'build-path' : '^1.0.0'
        }
    });
    t.falsy(caretDeps(caret), 'must pass for caret dependencies');

    const pinned = makePackage({
        dependencies : {
            'build-path' : '1.0.0'
        }
    });
    t.deepEqual(caretDeps(pinned), {
        path    : 'package.json',
        message : 'Package has pinned dependencies',
        data    : {
            dependencies : {
                'build-path' : {
                    expected : '^1.0.0',
                    wanted   : '1.0.0'
                }
            }
        }
    });
});
