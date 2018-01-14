import path from 'path';
import webpackSweetEntry from '../index';

const jsPath = path.join(__dirname, 'js');
const ab_path = __dirname.replace('/webpack-sweet-entry/test', '');
const wse = webpackSweetEntry(path.resolve(jsPath, '**/*.js*'), 'js', 'js');
const newObj = Object.assign({}, ...Object.keys(wse).map(k => ({[k]: wse[k].replace(ab_path, '')})));

describe('Test', () => {
  it('toEqual()', () => {
    expect(newObj).toEqual({ a: '/webpack-sweet-entry/test/js/a.js', b: '/webpack-sweet-entry/test/js/b.js', c: '/webpack-sweet-entry/test/js/c.js' });
  });
});
