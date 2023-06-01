const fs = require('fs');
const path = require('path');


// FUNCTION: VALIDATE ROUTE EXISTENCE
const existPath = (userPath) => {
	if (fs.existsSync(userPath)){
		console.log('The route exists');
		return true;
	} else {
		console.log('The path entered does not exist');
		return false;
	}
};


// FUNCTION: CHECK IF PATH IS ABSOLUTE, IF NOT, CONVERT TO ABSOLUTE
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