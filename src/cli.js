// Punto de entrada para recibir los argumentos de línea de comandos 
const { mdLinks } = require('./index.js');
const {statsBroken} = require('./getFilesMd.js');
const process = require('process');
const userPath = process.argv[2];

let optionsObj = {
  validate: false,
  stats: false,
};

const options = process.argv;

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
    if (optionsObj.stats === true) {
      const statsTotal = statsBroken(res);
      console.log(`Total: ${statsTotal.Total} Unique: ${statsTotal.Uniques} ${statsTotal.Broken ?  `Broken: ${statsTotal.Broken}`  : ''} `);
    }else{
      console.log(res);
    }
    // console.log('Este es el array de OBJS:', res);
  })
  .catch((error) => {
    // console.log(`Error: ${error}`);
    return error;
  });