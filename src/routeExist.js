const fs = require('fs');
const path = require('path');


// FUNCIÓN: VALIDAR EXISTENCIA DE RUTA
const existPath = (userPath) => {
	if (fs.existsSync(userPath)){
		console.log('La ruta existe');
		return true;
	} else {
		console.log('La ruta ingresada no existe');
		return false;
	}
};


// FUNCIÓN: VERIFICA SI RUTA ES ABSOLUTA, SI NO LO ES, CONVERTIR A ABSOLUTA
const absolutePath = (userPath) => {
	if(path.isAbsolute(userPath)) {
		return userPath;
	} else {
		return path.resolve(userPath);
	}
};


module.exports = {
	existPath,absolutePath
};