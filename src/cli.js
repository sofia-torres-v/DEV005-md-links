#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const {statsBroken} = require('./getFilesMd.js');
const process = require('process');// To access terminal arguments
const userPath = process.argv[2];
const {colors }= require ('colors')


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
      const statsTotal = statsBroken(res); // This function returns an object
      console.log(`Total: ${statsTotal.Total} Unique: ${statsTotal.Uniques} ${statsTotal.Broken ? `Broken: ${statsTotal.Broken}`.red : ''} `.blue);

    }else if (optionsObj.validate && !optionsObj.stats){
        res.forEach((element) => {
          console.log(`URL: ${element.href}`.blue);
          console.log(`Text: ${element.text}`.grey);
          console.log(`File: ${element.file}`.blue);
          console.log(`Status: ${element.status}`.yellow);
          console.log(`Status Text: ${element.statusText}`.green);
          console.log('');
        })
        // console.log('Result:', res);
      } else {
        res.forEach((element) => {
          console.log(`URL: ${element.href}`.blue);
          console.log(`Text: ${element.text}`.grey);
          console.log(`File: ${element.file}`.blue);
          console.log('');
        })
      }
    })

  .catch((error) => {
    console.log(`Error: ${error}`);
    return error;
  });