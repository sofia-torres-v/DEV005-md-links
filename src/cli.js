// punto de entrada para recibir los argumentos de línea de comandos y realizar el procesamiento inicial

const { mdLinks } = require('./index.js');
const { mdLinks } = require('./index.js');
const process = require('process');
const userPath = process.argv[2];

let optionsObj = {
  validate: false,
  stats: false,
};

const options = process.argv;
// const [,,, opt1, opt2] = process.argv;
// console.log(opt1, 11);
// console.log(opt2, 12);

if( options.includes('--validate') && (!options.includes('--stats'))){
    optionsObj.validate = true;

} else if (!options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.stats = true;

} else if (options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.validate = true;
    optionsObj.stats = true;

} else {
    optionsObj.validate = false;
    optionsObj.stats = false;
}

mdLinks(userPath, optionsObj)
  .then((res) => {
    console.log('Este es el array de OBJS:', res);
  })
  .catch((error) => {
    // console.log(`Error: ${error}`);
    return error;
  });


