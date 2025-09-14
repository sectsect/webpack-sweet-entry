import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { WebpackSweetEntry } from '../index';

const tsPath = path.join(__dirname, 'files/multi');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = WebpackSweetEntry(
  path.resolve(tsPath, '**/*.*s*'),
  ['ts', 'tsx', 'js', 'jsx'],
  'js',
);
const obj = Object.assign(
  {},
  ...Object.keys(wse).map(k => ({ [k]: wse[k].replace(abPath, '') })),
);

describe('WebpackSweetEntry with multiple extensions', () => {
  it('should generate entry points for TypeScript, TSX, JavaScript, and JSX files', () => {
    expect(obj).toEqual({
      a: '/webpack-sweet-entry/src/__tests__/files/multi/js/a.ts',
      b: '/webpack-sweet-entry/src/__tests__/files/multi/js/b.tsx',
      c: '/webpack-sweet-entry/src/__tests__/files/multi/js/c.js',
      d: '/webpack-sweet-entry/src/__tests__/files/multi/js/d.jsx',
    });
  });
});
