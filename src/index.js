const { existPath, absolutePath } = require('./routeExist.js');
const { getFilesMd, readAllMds, validate } = require('./getFilesMd.js');


// Contiene la lógica principal para analizar los archivos y extraer los enlaces.
const mdLinks = (userPath, options) => {
  const route = absolutePath(userPath);
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, la ruta no existe'));
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
        // console.log(readAllMds);
      });
      }
  });
};

module.exports = {
  mdLinks
};