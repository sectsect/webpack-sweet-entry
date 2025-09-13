import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { WebpackSweetEntry } from '../index';

const tsPath = path.join(__dirname, 'files/single');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = WebpackSweetEntry(
  [path.resolve(tsPath, '**/*.js*'), '!**/a.js'],
  'js',
  'js',
);
const obj = Object.assign(
  {},
  ...Object.keys(wse).map(k => ({ [k]: wse[k].replace(abPath, '') })),
);

describe('WebpackSweetEntry with multiple glob patterns', () => {
  it('should exclude files matching negation pattern (!**/a.js)', () => {
    expect(obj).toEqual({
      b: '/webpack-sweet-entry/src/__tests__/files/single/js/b.js',
      c: '/webpack-sweet-entry/src/__tests__/files/single/js/c.js',
    });
  });
});
