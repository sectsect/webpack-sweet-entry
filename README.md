# @sect/webpack-sweet-entry
[![CircleCI](https://circleci.com/gh/sectsect/webpack-sweet-entry.svg?style=svg)](https://circleci.com/gh/sectsect/webpack-sweet-entry) [![npm version](https://badge.fury.io/js/%40sect%2Fwebpack-sweet-entry.svg)](https://badge.fury.io/js/%40sect%2Fwebpack-sweet-entry) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/@sect/webpack-sweet-entry.png)](https://npmjs.org/package/@sect/webpack-sweet-entry)

Dynamic entry points / Partial files with underscore / Keep Directory Structure

## Install
```
npm install --save-dev @sect/webpack-sweet-entry
```
## Features
- Help Dynamic Entry Points with wildcards
- Support Partial files (Files and Directories named with a leading underscore `_` is ignored.)
- Keep directory structure in the output directory


## Usage Example
```js
const webpack = require('webpack');
const path = require('path');
const { WebpackSweetEntry } = require('@sect/webpack-sweet-entry');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = [
  {
    entry: WebpackSweetEntry(path.resolve(sourcePath, 'assets/js/**/*.js*'), 'js', 'js'),
    output: {
      path: path.resolve(buildPath, 'assets/js'),
      filename: '[name].js',
    },
    module: {
      ...
    }
  },
  {
    entry: WebpackSweetEntry(path.resolve(sourcePath, 'assets/css/**/*.css'), 'css', 'css'),
    output: {
      path: path.resolve(buildPath, 'assets/css'),
      filename: '[name].css',
    },
    module: {
      ...
    }
  }
];
```

### Multiple(Mixed) extentions
```js
module.exports = [
  {
    entry: WebpackSweetEntry(path.resolve(sourcePath, 'assets/scripts/**/*.*s*'), ['ts', 'js'], 'scripts'),
    output: {
      path: path.resolve(buildPath, 'assets/js'),
      filename: '[name].js',
    },
    module: {
      ...
    }
  },
  ...
];
```

## Function
```js
WebpackSweetEntry(path, ext, parentdir);
```

| arg | type | Description | Example |
| ---- | ---- | ----------- | ------- |
| path | `string` | File path | `path.resolve(sourcePath, 'assets/js/**/*.js*')` |
| ext | `string` \| `array` | File extension | `js` or `['ts', 'js']`
| parentdir | `string` | Parent Dirctory Name for files | `js` |

Returns `object` like the following.

```js
{
  a: '/path/to/your/src/assets/js/a.js',
  b: '/path/to/your/src/assets/js/b.js',
  'dir/e': '/path/to/your/src/assets/js/dir/e.js'
}
{
  a: '/path/to/your/src/assets/css/a.css',
  b: '/path/to/your/src/assets/css/b.css',
  'dir/e': '/path/to/your/src/assets/css/dir/e.css'
}
```


### Result
```
.
├── dist
│   └── assets
│       ├── css
│       │   ├── a.css
│       │   ├── b.css
│       │   └── dir
│       │       └── e.css
│       └── js
│           ├── a.js
│           ├── b.js
│           └── dir
│               └── e.js
├── src
│   └── assets
│       ├── css
│       │   ├── a.css
│       │   ├── b.css
│       │   ├── _c.css
│       │   ├── _d.css
│       │   └── dir
│       │       ├── e.css
│       │       └── _f.css
│       └── js
│           ├── a.js
│           ├── b.js
│           ├── _c.js
│           ├── _d.js
│           ├── _modules
│           │   ├── a.js
│           │   └── b.js
│           └── dir
│               ├── e.js
│               └── _f.js
├── package-lock.json
├── package.json
├── postcss.config.js
└── webpack.config.js
```

## Migrate from v1 to v2
```
$ npm uninstall webpack-sweet-entry
$ npm install --save-dev @sect/webpack-sweet-entry
```

```diff
- const WebpackSweetEntry = require('webpack-sweet-entry');
+ const { WebpackSweetEntry } = require('@sect/webpack-sweet-entry');
```

## Change log  

See [CHANGELOG](https://github.com/sectsect/webpack-sweet-entry/blob/master/CHANGELOG.md) file.

## License

See [LICENSE](https://github.com/sectsect/webpack-sweet-entry/blob/master/LICENSE) file.
