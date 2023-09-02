import fg from 'fast-glob';
import type { Pattern } from 'fast-glob/out/types';

type EntryPoints = Record<string, string>;

/**
 * The function `splitString` takes a string and a separator as input and returns an array of
 * substrings split by the separator.
 * @param stringToSplit - The `stringToSplit` parameter is a string that you want to split
 * into an array of substrings.
 * @param separator - The separator parameter is a string that specifies the character(s) or
 * regular expression used to split the stringToSplit parameter into an array of substrings.
 */
const splitString = (stringToSplit: string, separator: string) =>
  stringToSplit.split(separator);

/**
 * The function `dropUnderscoreFiles` filters out entries in an object that start with an underscore or
 * contain a forward slash followed by an underscore.
 * @param obj - The `obj` parameter is an object of type `EntryPoints`.
 * @returns The function `dropUnderscoreFiles` returns an object of type `EntryPoints`.
 */
const dropUnderscoreFiles = (obj: EntryPoints) => {
  const r: EntryPoints = {};
  Object.entries(obj).forEach(([key, val]) => {
    if (!key.startsWith('_') && !key.includes('/_')) {
      r[key] = val;
    }
  }, obj);
  return r;
};

/**
 * The function `createRegex` creates a regular expression that matches file extensions specified in an
 * array.
 * @param ext - An array of file extensions.
 * @returns The function `createRegex` returns a regular expression object.
 */
const createRegex = (ext: string[]) => {
  const d = ext.map((v: string) => `\\.${v}`);
  return new RegExp(`(${d.join('|')})$`, 'gi');
};

/**
 * The function `WebpackSweetEntry` takes in file paths and returns an object with entry points for
 * Webpack, removing the parent directory and file extension from the keys.
 * @param paths - The `paths` parameter is a pattern or an array of patterns that
 * specify the files or directories to include in the entry points. These patterns can use glob syntax
 * to match multiple files or directories.
 * @param ext - The `ext` parameter is the file extension(s) to filter the
 * paths by. It can be a string or an array of strings. By default, it is set to `'js'`.
 * @param parentdir - The `parentdir` parameter is a string that represents the parent directory
 * of the entry points. It is used to extract the key for each entry point.
 * @returns The function `WebpackSweetEntry` returns an object of type `EntryPoints`.
 */
export const WebpackSweetEntry = (
  paths: Pattern | Pattern[],
  ext: string | string[] = 'js',
  parentdir = 'js',
): EntryPoints => {
  const g = fg.sync(paths);
  const r: EntryPoints = {};
  const rp = Array.isArray(ext) ? createRegex(ext) : `.${ext}`;
  g.forEach((path: string) => {
    const key = splitString(path, `/${parentdir}/`)
      .slice(-1)[0]
      .replace(rp, '');
    r[key] = path;
  });
  return dropUnderscoreFiles(r);
};
