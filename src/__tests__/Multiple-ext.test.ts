import * as path from 'path';
const webpackSweetEntry = require('../index');

const tsPath = path.join(__dirname, 'files/multi');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = webpackSweetEntry(path.resolve(tsPath, '**/*.*s*'), ['ts', 'js'], 'multi');
const obj = Object.assign({}, ...Object.keys(wse).map(k => ({[k]: wse[k].replace(abPath, '')})));

describe('Test', () => {
  it('toEqual()', () => {
    expect(obj).toEqual({
      a: '/webpack-sweet-entry/src/__tests__/files/multi/a.ts',
      b: '/webpack-sweet-entry/src/__tests__/files/multi/b.ts',
      c: '/webpack-sweet-entry/src/__tests__/files/multi/c.js'
    });
  });
});
