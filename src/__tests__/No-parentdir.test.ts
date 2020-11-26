import * as path from 'path';
import { WebpackSweetEntry } from '../index';

const tsPath = path.join(__dirname, 'files/single');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = WebpackSweetEntry(path.resolve(tsPath, '**/*.js*'), 'js');
const obj = Object.assign({}, ...Object.keys(wse).map(k => ({ [k]: wse[k].replace(abPath, '') })));

describe('Test', () => {
  it('toEqual()', () => {
    expect(obj).toEqual({
      a: '/webpack-sweet-entry/src/__tests__/files/single/js/a.js',
      b: '/webpack-sweet-entry/src/__tests__/files/single/js/b.js',
      c: '/webpack-sweet-entry/src/__tests__/files/single/js/c.js',
    });
  });
});
