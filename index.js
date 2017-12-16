const glob = require('glob');

function splitString(stringToSplit, separator) {
  return stringToSplit.split(separator);
}

function dropUnderscoreFiles(obj) {
  const returnobj = {};
  Object.keys(obj).forEach(function (key) {
    const val = this[key]; // this == obj
    if (key.substring(0, 1) !== '_' && !key.includes('/_')) {
      returnobj[key] = val;
    }
  }, obj);

  return returnobj;
}

function toObject(paths, ext, parentdir) {
  const globpaths = glob.sync(paths);
  const ret = {};
  globpaths.forEach((path) => {
    const key = splitString(path, `/${parentdir}/`).slice(-1)[0].replace(`.${ext}`, '');
    ret[key] = path;
  });

  return dropUnderscoreFiles(ret);
}

module.exports = toObject;
