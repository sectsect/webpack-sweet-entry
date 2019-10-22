import * as path from 'path';
const webpackSweetEntry = require('../index');

const tsPath = path.join(__dirname, 'files/single');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = webpackSweetEntry(path.resolve(tsPath, '**/*.js*'), 'js', 'single');
const obj = Object.assign({}, ...Object.keys(wse).map(k => ({[k]: wse[k].replace(abPath, '')})));

describe('Test', () => {
  it('toEqual()', () => {
    expect(obj).toEqual({
      a: '/webpack-sweet-entry/src/__tests__/files/single/a.js',
      b: '/webpack-sweet-entry/src/__tests__/files/single/b.js',
      c: '/webpack-sweet-entry/src/__tests__/files/single/c.js'
    });
  });
});
