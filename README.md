# @sect/webpack-sweet-entry
[![Test](https://github.com/sectsect/webpack-sweet-entry/actions/workflows/test.yml/badge.svg)](https://github.com/sectsect/webpack-sweet-entry/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/sectsect/webpack-sweet-entry/branch/master/graph/badge.svg?token=0EKNBV7VK1)](https://codecov.io/gh/sectsect/webpack-sweet-entry) [![CodeQL](https://github.com/sectsect/webpack-sweet-entry/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/sectsect/webpack-sweet-entry/actions/workflows/github-code-scanning/codeql)

Multiple entry points with glob pattern / Ignore files and directories with leading underscore `_` / Preserve directory structure 

## Install
```
npm install --save-dev @sect/webpack-sweet-entry
```
## Features
- Multiple entry points with glob pattern.
- Ignore files and directories with leading underscore `_`.
- Preserve directory structure in `dist` directory.
- Dual Package Support (CommonJS and ES Modules).


## Usage Example

### CommonJS
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

### ES Modules
```js
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { WebpackSweetEntry } from '@sect/webpack-sweet-entry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

export default [
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

### TypeScript
```ts
import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { WebpackSweetEntry } from '@sect/webpack-sweet-entry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const config: webpack.Configuration[] = [
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

export default config;
```

### Multiple(Mixed) extensions
```ts
const config: webpack.Configuration[] = [
  {
    entry: WebpackSweetEntry(path.resolve(sourcePath, 'assets/scripts/**/*.*s*'), ['ts', 'js'], 'scripts'),
    output: {
      ...
    },
    module: {
      ...
    }
  },
  ...
];
```

## API
```js
WebpackSweetEntry(path, ext, parentdir);
```

| arg | type | Description | Example |
| ---- | ---- | ----------- | ------- |
| path | `string` \| `string[]` | File path glob(s) | `path.resolve(sourcePath, 'assets/js/**/*.js*')` or `[path.resolve(sourcePath, 'assets/js/**/*.js*'), '!**/a.js']` |
| ext | `string` \| `string[]` | File extension | `js` or `['ts', 'js']`
| parentdir | `string` | Parent Dirctory Name for files (The directory name where the tree starts) | `js` |

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


### Build Result
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
└── webpack.config.js
```

## Migrate from v1
```
$ npm uninstall webpack-sweet-entry
$ npm install --save-dev @sect/webpack-sweet-entry
```

```diff
- const WebpackSweetEntry = require('webpack-sweet-entry');
+ const { WebpackSweetEntry } = require('@sect/webpack-sweet-entry');
```

## Changelog 

See [CHANGELOG](https://github.com/sectsect/webpack-sweet-entry/blob/master/CHANGELOG.md) file.

<p align="center">✌️</p>
<p align="center">
<sub><sup>A little project by <a href="https://github.com/sectsect">@sectsect</a></sup></sub>
</p>
