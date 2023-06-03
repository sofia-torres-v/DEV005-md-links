const { mdLinks } = require("../src/index.js");
const { absolutePath } = require("../src/routeExist.js");
const { getFilesMd, getLinks, readFile, readAllMds, statsBroken } = require("../src/getFilesMd.js");

const path = require('path');


// mdLinks function
describe("mdLinks", () => {
  it("should be a function", () => {
    expect(typeof mdLinks).toBe("function");
  });

  it("Should reject the promise when the path does not exist", () => {
    return mdLinks("/leerArchivo/doesnotexist.md").catch((error) => {
      expect(error.message).toBe("Error, the path does not exist");
    });
  });

  it("I should return a promise", ()=>{
    const path1 = "src/files/one.md";
    const options = { validate: false};
    expect(mdLinks(path1, options)).toBeInstanceOf(Promise);   
  });

  it("I should return a promise", ()=>{
    const path2 = "src/files/one.md";
    const options = { validate: true};
    expect(mdLinks(path2, options)).toBeInstanceOf(Promise);   
  });

  it("If you enter option 'validate' it will return the links showing href,text,file,status and statusText", () => {
    const arrFiles = [
      {
        href: 'https://mascoteando-andrenavas.vercel.app/error',
        text: 'Mascoteando',
        file: 'C:\\DEV005-md-links\\src\\files\\four.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://www.google.com/',
        text: 'link to Google',
        file: 'C:\\DEV005-md-links\\src\\files\\one.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.youtube.com/watch?v=95BFumHfwAA',
        text: 'link to youtube',
        file: 'C:\\DEV005-md-links\\src\\files\\three.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.freecodecamp.org/',
        text: 'link to freecodecamp',
        file: 'C:\\DEV005-md-links\\src\\files\\two.md',
        status: 200,
        statusText: 'OK'
      }
    ];
    const resultPromise = mdLinks("C:\\DEV005-md-links\\src\\files", { validate: true });
    return resultPromise.then((result) => {
      expect(result).toEqual(arrFiles);
    });
  });
});


// absolute function
describe('absolutePath', () =>{
  it('should be a function', () => {
    expect(typeof absolutePath).toBe('function');
  });

  it("Should return the absolute path when the path is absolute", () => {
    const absRoute = 'C:/DEV005-md-links/src/one.md'
    const sameAbsRoute = 'C:/DEV005-md-links/src/one.md'
    const resultAbsRoute = absolutePath(absRoute);
    expect(resultAbsRoute).toBe(sameAbsRoute);
  });

  it("Should return the absolute path when the path is relative", () => {
    const relativeRoute = 'files/one.md'
    const absoluteRoute = "C:\\DEV005-md-links\\files\\one.md"
    const resultRout = absolutePath(relativeRoute);
    expect(resultRout).toBe(absoluteRoute);
  });
});


// getFilesMd function
describe('getFilesMd', () => {
  it('should be a function', ()=> {
    expect(typeof getFilesMd).toBe('function');
  });

  it('You must extract the content of a file and return it as a string', () => {
    const cwd = process.cwd();
    const filePath = path.join(cwd, "src\\files\\four.md");
    const result = getFilesMd(filePath);
    expect(result).toEqual(
    ['C:\\DEV005-md-links\\src\\files\\four.md' ]);
  });

  it('It must return an array with the contents of the folder', () => {
    const filePath = 'src/files'; 
    const result = getFilesMd(filePath);
    expect(result).toEqual([
      "src\\files\\four.md",
      "src\\files\\one.md",
      "src\\files\\three.md",
      "src\\files\\two.md",
    ]);
})
});


// getLinks function
describe('getLinks', () => {
  it('should be a function', () => {
    expect( typeof getLinks).toBe('function');
  })
})


// readFiles function
describe('readFile', () => {
  it('should be a function', () => {
    expect( typeof readFile).toBe('function');
  })

  it("It should resolve the promise, when reading the file is successful", ()=>{
    const filePath = "src/files/one.md";
    expect(readFile(filePath)).toBeInstanceOf(Promise);   
  });

  it("It should reject the promise if an error occurs while reading the file", () => {
    return readFile("/leerArchivo/doesnotexist.md").catch((error) => {
      expect(error.code).toBe("ENOENT");
    });
  });
})


// readAllMds function
describe('readAllMds', () => {
  it('should be a function', () =>{
    expect( typeof readAllMds).toBe('function');
  })
})


// statsBroken function
describe('statsBroken', () => {
  it('should be a function', () =>{
    expect( typeof statsBroken).toBe('function');
  })
})




