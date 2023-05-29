const { existPath } = require('./routeExist.js');
const { getFilesMd, readAllMds } = require('./getFilesMd.js');
const process = require('process');//Acceso a los argumentos ingresados desde línea de comandos.
const userPath = process.argv[2];


// FUNCIÓN MD-LINKS
const mdLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    if (!existPath(userPath)) {
      reject(new Error('Error, la ruta no existe'));
    } else { 
      const arrayFilesMd = getFilesMd(userPath);
      readAllMds(arrayFilesMd)
      .then((res) => {
        resolve(res.flat()); //Quede en solo un array
      });
    }
  });
};

mdLinks(userPath)
  .then((res) => {
    console.log('Este es el array de OBJS:', res);
  })
  .catch((error) => {
    // console.log(`Error: ${error}`);
    return error;
  });
  

module.exports = {
  mdLinks
};
