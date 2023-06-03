const { existPath, absolutePath } = require('./routeExist.js');
const { getFilesMd, readAllMds, validate } = require('./getFilesMd.js');


// Contains the main logic for parsing the files and extracting the links.
const mdLinks = (userPath, options) => {
  const route = absolutePath(userPath);
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, the path does not exist'));
    }
    
    if (options.validate === true ) {
      const arrayFiles = getFilesMd(route);
      readAllMds(arrayFiles)
      .then((link) => {
        resolve(validate(link.flat()));
      });

    } else {
      const arrayFiles = getFilesMd(route);
      readAllMds(arrayFiles)
      .then((res) => {
        resolve(res.flat());
      });
      }
  });
};

module.exports = {
  mdLinks
};