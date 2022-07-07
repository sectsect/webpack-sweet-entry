import * as path from 'path';
import { WebpackSweetEntry } from '../index';

const tsPath = path.join(__dirname, 'files/unmatched');
const abPath = __dirname.replace('/webpack-sweet-entry/src/__tests__', '');
const wse = WebpackSweetEntry(path.resolve(tsPath, '**/*.js*'), 'js', 'js');
const obj = Object.assign(
  {},
  ...Object.keys(wse).map(k => ({ [k]: wse[k].replace(abPath, '') })),
);

describe('Unmatched Files Test', () => {
  it('toEqual()', () => {
    expect(obj).toEqual({});
  });
});
