import * as path from 'path';
import { describe, expect, it } from 'vitest';
import { WebpackSweetEntry } from '../index';

const tsPath = path.join(__dirname, 'files/unmatched');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = WebpackSweetEntry(path.resolve(tsPath, '**/*.js*'), 'js', 'js');
const obj = Object.assign(
  {},
  ...Object.keys(wse).map(k => ({ [k]: wse[k].replace(abPath, '') })),
);

describe('WebpackSweetEntry with no matching files', () => {
  it('should return empty object when no files match pattern', () => {
    expect(obj).toEqual({});
  });
});
