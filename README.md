# webpack sweet entry
Dynamic entry points / Partial files with underscore / Keep Directory Structure for webpack

## Installation
```
npm i webpack-sweet-entry --save-dev
```
## Feature
- Helps Dynamic entry points
- Support Partial files (Files named with a leading underscore is ignored.)
- Keep Directory Structure for output


## Usage Example
```js
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const WebpackSweetEntry = require('webpack-sweet-entry');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

module.exports = [
  {
    entry: WebpackSweetEntry(glob.sync(path.resolve(sourcePath, 'assets/js/**/*.js*')), 'js', 'js'),
    output: {
      path: path.resolve(buildPath, 'assets/js'),
      filename: '[name].js',
    },
	module: {
	  ...
    }
  },
  {
    entry: WebpackSweetEntry(glob.sync(path.resolve(sourcePath, 'assets/css/**/*.css*')), 'css', 'css'),
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

## function
```js
WebpackSweetEntry(paths, ext, parentdir);
```

| arg | type | Description | Example |
| ---- | ---- | ----------- | ------- |
| paths | `array` | Array of file path | `glob.sync(path.resolve(sourcePath, 'assets/js/**/*.js*'))` |
| ext | `string` | File extension | `js` |
| parentdir | `string` | Parent Dirctory Name for files | `js` |

`WebpackSweetEntry()` returns object like the following.

```js
{
  a: '/path/to/your/src/assets/js/a.js',
  b: '/path/to/your/src/assets/js/b.js'
}
{
  a: '/path/to/your/src/assets/css/a.css',
  b: '/path/to/your/src/assets/css/b.css'
}
```


### Result
```
.
├── dist
│   └── assets
│       ├── css
│       │   ├── a.css
│       │   └── b.css
│       └── js
│           ├── a.js
│           └── b.js
├── src
│   └── assets
│       ├── css
│       │   ├── a.css
│       │   ├── b.css
│       │   ├── _c.css
│       │   └── _d.css
│       └── js
│           ├── a.js
│           ├── b.js
│           ├── _c.js
│           └── _d.js
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
