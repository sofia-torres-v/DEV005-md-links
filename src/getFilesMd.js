const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const fetch = require('node-fetch');


// FUNCIÓN RECURSIVA: LEER ARCHIVO Y DIRECTORIO LUEGO EXTRAER SOLO archivos.md
const getFilesMd = (directoryPath) => {
  let arrayFilesMd = [];
  const route = fs.lstatSync(directoryPath);
  //obtener información del archivo específicado
  if (route.isFile()) {
    arrayFilesMd.push(directoryPath);
  } else if (route.isDirectory()) {
    const arrayElements = fs.readdirSync(directoryPath);
    // fs.readdirSync nos da archivos que se encuentran en un directorio
    arrayElements.forEach((element) => {
      const newPath = path.join(directoryPath, element);
      arrayFilesMd = arrayFilesMd.concat(getFilesMd(newPath));
      //Recursión,llamando getFilesMd para cada elemento encontrado en el directorio.
    });
  } else {
    return [];
  }
  return arrayFilesMd.filter((file) => path.extname(file) === '.md');
};


// FUNCIÓN: CONVERTIR ARCHIVOS MD A HTML
const mdToHtml = (data) => {
  //Market covierte contenido .md a contenido html.
  const htmlContent = marked(data, {
    headerIds: false,
    mangle: false,
  });
  // console.log(htmlContent);
  //jsdom: Simula un entorno de navegador
  const dom = new JSDOM(htmlContent);
  const links = dom.window.document.querySelectorAll('a'); //.length
  // console.log(links);
  return links;
  //Retornamos nodos de enlaces encontrados del html(convertido) 
};


// FUNCIÓN: OBTENER LINKS DE lOS ARCHIVOS .md
const getLinks = (links, mdfilePath) => {
  const arrayLinks = [];
  links.forEach((link) => {
    const linkObject = {
      href: link.href,
      text: link.textContent.substring(0, 50),
      file: mdfilePath,
    };
    arrayLinks.push(linkObject);
  });
  // console.log(arrayLinks);
  return arrayLinks;
  //retorna un array para cada archivo
};

// FUNCIÓN: LEE CONTENIDO DE UN ARCHIVO ESPECIFICADO POR mdFilePath
//trae el contenido de un solo archivo
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    //Para obtener un resultado rechazado o resuelto
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const convertHtml = mdToHtml(data);
        const linksFromHtml = getLinks(convertHtml, filePath);        
        resolve(linksFromHtml);
        // console.log(linksFromHtml);
      }
    });
  });
};


//FUNCIÓN:TOMA UN ARRAY DE RUTAS .md
const readAllMds = (arrayFilesMd) => {
  const arrayLinks = arrayFilesMd.map((file) => {
    return readFile(file);
  });
  return Promise.all(arrayLinks);
  //Retorna una promesa que se resuelve con un array de array de enlaces
};
// fetch('https://nodejs.org/es/').then((res) => {
//   console.log(res);
// });

module.exports = {
  getFilesMd, readAllMds
};