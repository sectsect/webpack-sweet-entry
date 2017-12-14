function splitString(stringToSplit, separator) {
  const arrayOfStrings = stringToSplit.split(separator);

  return arrayOfStrings;
}

function dropUnderscoreFiles(obj) {
  const returnobj = {};
  Object.keys(obj).forEach(function (key) {
    const val = this[key]; // this == obj
    if (key.substring(0, 1) !== '_' && key.indexOf('/_') === -1) {
      returnobj[key] = val;
    }
  }, obj);

  return returnobj;
}

function toObject(paths, ext, parentdir) {
  const ret = {};
  paths.forEach((path) => {
    const key = splitString(path, `/${parentdir}/`).slice(-1)[0].replace(`.${ext}`, '');
    ret[key] = path;
  });

  return dropUnderscoreFiles(ret);
}

module.exports = toObject;
