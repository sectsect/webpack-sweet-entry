import fg from 'fast-glob';

interface EntryPoints {
  [key: string]: string;
}

const splitString = (stringToSplit: string, separator: string) => stringToSplit.split(separator);

const dropUnderscoreFiles = (obj: EntryPoints) => {
  const r: EntryPoints = {};
  Object.keys(obj).forEach(function (key) {
    const val = this[key];
    if (key.substring(0, 1) !== '_' && !key.includes('/_')) {
      r[key] = val;
    }
  }, obj);
  return r;
};

const createRegex = (ext: string[]) => {
  const d = ext.map((v: string) => `\\.${v}`);
  return new RegExp(`${d.join('|')}`, 'gi');
};

export const WebpackSweetEntry = (paths: string, ext: string | string[] = 'js', parentdir = 'js'): EntryPoints => {
  const g = fg.sync(paths);
  const r: EntryPoints = {};
  const rp = Array.isArray(ext) ? createRegex(ext) : `.${ext}`;
  g.forEach((path: string) => {
    const key = splitString(path, `/${parentdir}/`).slice(-1)[0].replace(rp, '');
    r[key] = path;
  });
  return dropUnderscoreFiles(r);
};
