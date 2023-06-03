const fs = require('fs');
const path = require('path');
const { marked}  = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fetch = require('node-fetch');


// Recursive function to find MDS files, add them to an array, and return it.
const getFilesMd = (directoryPath) => {
  let arrayFilesMd = [];

  const route = fs.lstatSync(directoryPath);
  if (route.isFile()) {
    arrayFilesMd.push(directoryPath);

  } else if (route.isDirectory()) {
    const arrayElements = fs.readdirSync(directoryPath);  
      // It allows to obtain elements of a directory and, we will have an array (files and directories)
    arrayElements.forEach((element) => {
      const newPath = path.join(directoryPath, element);
      arrayFilesMd = arrayFilesMd.concat(getFilesMd(newPath));
      // calling getFilesMd for each item found in the directory.
    });
  }
  return arrayFilesMd.filter((file) => path.extname(file) === '.md');
};


// Function to convert md files to Html
const mdToHtml = (data) => {
  const htmlContent = marked(data, {
    headerIds: false,
    mangle: false,
  });
  //jsdom: Simulates a browser environment
  const dom = new JSDOM(htmlContent);
  const links = dom.window.document.querySelectorAll('a'); //.length
  return links;
  // We return link nodes
};


// Function to abtain links
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
 // Returns an array of objects for each file
};


// Function reads contents of a files specified by mdFilesPath
// Get the content of a single file
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);

      } else {
        const convertHtml = mdToHtml(data);
        const linksFromHtml = getLinks(convertHtml, filePath);        
        resolve(linksFromHtml);
      }
    });
  });
};


// Function that takes an array of routes.md
const readAllMds = (arrayFilesMd) => {
  const arrayLinks = arrayFilesMd.map((file) => readFile(file));

  return Promise.all(arrayLinks);
  //Returns an array of links array
};


// Function to validate each link of the array 
const validate = (arrayLinks)=> {
  return new Promise((resolve) => {
   // Allow to perform asynchronous operations
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
      // Returns an array of updated links
    });
  });
} ;


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
  statsBroken
};