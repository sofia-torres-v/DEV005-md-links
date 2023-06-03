const fs = require('fs');
const path = require('path');


// Function validate route existence
const existPath = (userPath) => {
	if (fs.existsSync(userPath)){
		console.log('The route exists');
		return true;
	} else {
		console.log('The path entered does not exist');
		return false;
	}
};


// The function checks and converts a path to absolute
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