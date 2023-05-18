// función identificar ruta de archivo o directorio.
const fs = require("fs");
const path = require("path");

const absolutePath = process.argv[2];

const getFilesMd = (absolutePath) =>{
  let arrMd = [];
	let route = fs.lstatSync(absolutePath);//obtener informacion sobre el archivo o directorio

	if (route.isFile() && path.extname(absolutePath) === '.md') {
		arrMd.push(absolutePath);
    return console.log("Es un archivo");

	}else if( route.isDirectory()){
    console.log('es directorio')
    let arrFile = fs.readdirSync(absolutePath);
    arrFile.forEach((currentElement) => {
      console.log(arrFile);
      const arrNew = path.join(absolutePath, currentElement)
      arrMd = arrMd.concat(getFilesMd(arrNew));
    });
  } 
  else {
	console.log("invalid");
	}
  return arrMd;
};
getFilesMd(absolutePath);
// getFilesMd(userPath);
// getFilesMd('example.md');
// getFilesMd("../helpers");











