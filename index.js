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

const toObject = (paths, ext, parentdir) => {
  const g = fg.sync(paths);
  const r = {};
  g.forEach((path) => {
    const key = splitString(path, `/${parentdir}/`).slice(-1)[0].replace(`.${ext}`, '');
    r[key] = path;
  });
  return dropUnderscoreFiles(r);
};

module.exports = toObject;
