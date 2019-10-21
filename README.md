# <img src="https://github-sect.s3-ap-northeast-1.amazonaws.com/logo.svg" width="28" height="auto"> webpack sweet entry
[![CircleCI](https://circleci.com/gh/sectsect/webpack-sweet-entry.svg?style=svg)](https://circleci.com/gh/sectsect/webpack-sweet-entry) [![npm version](https://badge.fury.io/js/webpack-sweet-entry.svg)](https://badge.fury.io/js/webpack-sweet-entry) [![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/webpack-sweet-entry.png)](https://npmjs.org/package/webpack-sweet-entry)

Dynamic entry points / Partial files with underscore / Keep Directory Structure for output

## Installation
```
npm i webpack-sweet-entry --save-dev
```
## Feature
- Helps Dynamic entry points with wildcards
- Support Partial files (Files and Directories named with a leading underscore `_` is ignored.)
- Keep Directory Structure for output


## Usage Example
```js
const webpack = require('webpack');
const path = require('path');
const WebpackSweetEntry = require('webpack-sweet-entry');

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

## function
```js
WebpackSweetEntry(path, ext, parentdir);
```

| arg | type | Description | Example |
| ---- | ---- | ----------- | ------- |
| path | `string` | File path | `path.resolve(sourcePath, 'assets/js/**/*.js*')` |
| ext | `string` \| `array` | File extension | `js` or `['ts', 'js']`
| parentdir | `string` | Parent Dirctory Name for files | `js` |

`WebpackSweetEntry()` returns object like the following.

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

## Change log  

See [CHANGELOG](https://github.com/sectsect/webpack-sweet-entry/blob/master/CHANGELOG.md) file.

## Contributing

1. Create an issue and describe your idea
2. [Fork it](https://github.com/sectsect/webpack-sweet-entry/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request
7. Profit! :white_check_mark:

## License

See [LICENSE](https://github.com/sectsect/webpack-sweet-entry/blob/master/LICENSE) file.
