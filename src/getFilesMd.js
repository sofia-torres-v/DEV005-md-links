const fs = require('fs');
const path = require('path');
const { marked}  = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');


// FUNCIÓN RECURSIVA: Buscar archivos mds,los agrega(array) y los devuelve.
const getFilesMd = (directoryPath) => {
  let arrayFilesMd = [];
  const route = fs.lstatSync(directoryPath);//permite verificar archivo/directorio
  if (route.isFile()) {
    arrayFilesMd.push(directoryPath);
  } else if (route.isDirectory()) {
    const arrayElements = fs.readdirSync(directoryPath);
    //Permite obtener elementos de un directorioy,tendremos un array(archivos y directorios)
    arrayElements.forEach((element) => {
      // Para cada elemento encontrado en el directorio,construye una nueva ruta
      const newPath = path.join(directoryPath, element);
      arrayFilesMd = arrayFilesMd.concat(getFilesMd(newPath));
      //llamando getFilesMd para cada elemento encontrado en el directorio.
    });
  }
  return arrayFilesMd.filter((file) => path.extname(file) === '.md');
};


// FUNCIÓN PARA CONVERTIR ARCHIVOS MD A HTML
const mdToHtml = (data) => {
  const htmlContent = marked(data, {
    headerIds: false,
    mangle: false,
  });
  //jsdom: Simula un entorno de navegador
  const dom = new JSDOM(htmlContent);
  const links = dom.window.document.querySelectorAll('a'); //.length
  return links;
  //Retornamos nodos de enlaces encontrados del html(convertido) 
};


// FUNCIÓN PARA OBTENER LINKS DE lOS ARCHIVOS md
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
  return arrayLinks;
  //retorna un array de objetos para cada archivo
};


// FUNCIÓN LEE CONTENIDO DE UN ARCHIVO ESPECIFICADO POR mdFilePath
//trae el contenido de un solo archivo
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    //Para obtener un resultado rechazado o resuelto
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const convertHtml = mdToHtml(data);
        // console.log(convertHtml);
        const linksFromHtml = getLinks(convertHtml, filePath);        
        resolve(linksFromHtml);
      }
    });
  });
};


// FUNCIÓN QUE TOMA UN ARRAY DE RUTAS .md
const readAllMds = (arrayFilesMd) => {
  const arrayLinks = arrayFilesMd.map((file) => readFile(file));

  return Promise.all(arrayLinks);
  //Retorna una promesa que se resuelve con un array de array de enlaces
};


// FUNCIÓN PARA VALIDAR CADA LINK DEL ARRAY
const validate = (arrayLinks)=> {
  return new Promise((resolve) => {
    //permite realizar operaciones asíncronas
    let fetchLinks = arrayLinks.map((element) => {
      return fetch(element)
      .then((res) => {
        element.status = res.status;
        element.statusText = res.statusText;
      })
      .catch((err) =>{
        element.status = err;
      });
    });
    Promise.all(fetchLinks).then(() =>{
      resolve(arrayLinks);
      //retorna un array de enlaces actualizados
    });
  });
} ;


// FUNCIONES PARA ESTADO DE LINKS
const stats = (arrayObjs) => {
  let uniqueSet = new Set(arrayObjs.map((link) => link.href)).size;
  return {
    Total: arrayObjs.length,
    Uniques: uniqueSet,
  };
};

const statsBroken = (arrayObjs) => {
  let uniqueSet = new Set(arrayObjs.map((link) => link.href)).size;
  return {
    Total: arrayObjs.length,
    Uniques: uniqueSet,
    Broken: (arrayObjs.filter(element => element.statusText === 'Not Found')).length,
  };
};


module.exports = {
  getFilesMd, 
  readAllMds,
  getLinks,
  readFile,
  validate,
  stats,
  statsBroken
};