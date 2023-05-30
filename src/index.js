const { existPath, absolutePath } = require('./routeExist.js');
const { getFilesMd, readAllMds, validate, stats, statsBroken } = require('./getFilesMd.js');



//contiene la lógica principal para analizar los archivos y extraer los enlaces.
const mdLinks = (userPath, options) => {
  const route = absolutePath(userPath);
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, la ruta no existe'));

    } else if (options.validate === true && (options.stats === false)) {
      const arrayFiles = getFilesMd(route);
      readAllMds(arrayFiles)
      .then((link) => {
        resolve(validate(link.flat()));
      });

    } else if (options.validate === false && (options.stats === true)){
      const arrayFiles = getFilesMd(route);
      readAllMds(arrayFiles)
      .then((link) => {
        validate(link.flat()).then((links) => {
          resolve(stats(links));
        });
      });
    
    //probando
  } else if (options.stats === true && (options.validate === true)){
    const arrayFiles = getFilesMd(route);
    readAllMds(arrayFiles)
    .then((link) => {
      validate(link.flat()).then((links) => {
        resolve(statsBroken(links));
      });
    });


    } else {
      const arrayFiles = getFilesMd(route);
      readAllMds(arrayFiles)
      .then((res) => {
        resolve(res.flat());
        console.log(readAllMds);
      });
      }
  });
};

module.exports = {
  mdLinks
};