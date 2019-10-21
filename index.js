const fg = require('fast-glob');

const splitString = (stringToSplit, separator) => stringToSplit.split(separator);

const dropUnderscoreFiles = (obj) => {
  const r = {};
  Object.keys(obj).forEach(function (key) {
    const val = this[key]; // this == obj
    if (key.substring(0, 1) !== '_' && !key.includes('/_')) {
      r[key] = val;
    }
  }, obj);
  return r;
};

const createRegex = (ext) => {
  const d = ext.map(v => `\\.${v}`);
  return new RegExp(`${d.join('|')}`, 'gi');
}

const toObject = (paths, ext = 'js', parentdir = 'js') => {
  const g = fg.sync(paths);
  const r = {};
  const rp = (Array.isArray(ext)) ? createRegex(ext) : `.${ext}`;
  g.forEach((path) => {
    const key = splitString(path, `/${parentdir}/`).slice(-1)[0].replace(rp, '');
    r[key] = path;
  });
  return dropUnderscoreFiles(r);
};

module.exports = toObject;
