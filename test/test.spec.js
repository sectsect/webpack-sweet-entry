import path from 'path';
import { expect, assert } from 'chai';
import webpackSweetEntry from '../index';

const jsPath = path.join(__dirname, 'js');
const wse = webpackSweetEntry(path.resolve(jsPath, '**/*.js*'), 'js', 'js');

describe('Test', () => {
  it('isObject()', () => {
    assert.isObject(wse, 'webpackSweetEntry is an object');
  });
  it('have.all.keys()', () => {
    expect(wse).to.have.all.keys('a', 'b', 'c');
  });
});
