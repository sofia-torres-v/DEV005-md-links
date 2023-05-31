const { mdLinks } = require("../src/index.js");
const { absolutePath } = require("../src/routeExist.js");
const { getFilesMd, getLinks, readFile, readAllMds, stats, statsBroken } = require("../src/getFilesMd.js");

const path = require('path');


// FUNCIÓN mdLinks
describe("mdLinks", () => {
  it("Deberia ser una función", () => {
    expect(typeof mdLinks).toBe("function");
  });

  it("Deberia rechazar la promesa cuando la ruta no existe", () => {
    return mdLinks("/leerArchivo/noexiste.md").catch((error) => {
      expect(error.message).toBe("Error, la ruta no existe");
    });
  });

  it("Deberia devolver una promesa", ()=>{
    const path1 = "src/prueba/one.md";
    const options = { validate: false};
    expect(mdLinks(path1, options)).toBeInstanceOf(Promise);   
  });

  it("Deberia devolver una promesa", ()=>{
    const path2 = "src/prueba/one.md";
    const options = { validate: true};
    expect(mdLinks(path2, options)).toBeInstanceOf(Promise);   
  });


  it("Si ingresa opción 'validate' devolvera los enlaces mostrando href,text,file,status y statusText", () => {
    const arrPrueba = [
      {
        href: 'https://mascoteando-andrenavas.vercel.app/error',
        text: 'Mascoteando',
        file: 'C:\\DEV005-md-links\\src\\prueba\\four.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://www.google.com/',
        text: 'link to Google',
        file: 'C:\\DEV005-md-links\\src\\prueba\\one.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.youtube.com/watch?v=95BFumHfwAA',
        text: 'link to youtube',
        file: 'C:\\DEV005-md-links\\src\\prueba\\three.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.freecodecamp.org/',
        text: 'link to freecodecamp',
        file: 'C:\\DEV005-md-links\\src\\prueba\\two.md',
        status: 200,
        statusText: 'OK'
      }
    ];
    const resultPromise = mdLinks("C:\\DEV005-md-links\\src\\prueba", { validate: true });
    return resultPromise.then((result) => {
      expect(result).toEqual(arrPrueba);
    });
  });
});


// FUNCION absolutePath
describe('absolutePath', () =>{
  it('Deberia ser una función', () => {
    expect(typeof absolutePath).toBe('function');
  });

  it("Deberia devolver la ruta absoluta cuando la ruta es absoluta", () => {
    const absRoute = 'C:/DEV005-md-links/src/one.md'
    const sameAbsRoute = 'C:/DEV005-md-links/src/one.md'
    const resultAbsRoute = absolutePath(absRoute);
    expect(resultAbsRoute).toBe(sameAbsRoute);
  });
  it("Deberia devolver la ruta absoluta cuando la ruta es relativa", () => {
    const relativeRoute = 'prueba/one.md'
    const absoluteRoute = "C:\\DEV005-md-links\\prueba\\one.md"
    const resultRout = absolutePath(relativeRoute);
    expect(resultRout).toBe(absoluteRoute);
  });
});


// FUNCION getFilesMd
describe('getFilesMd', () => {
  it('Deberia ser una función', ()=> {
    expect(typeof getFilesMd).toBe('function');
  });

  it('Debe extraer el contenido de un archivo y devolverlo como un string', () => {
    const cwd = process.cwd();
    const filePath = path.join(cwd, "src\\prueba\\four.md");
    const result = getFilesMd(filePath);
    expect(result).toEqual(
    ['C:\\DEV005-md-links\\src\\prueba\\four.md' ]);
  });

  it('Debe devolver un array con el contenido de la carpeta', () => {
    const filePath = 'src/prueba'; 
    const result = getFilesMd(filePath);
    expect(result).toEqual([
      "src\\prueba\\four.md",
      "src\\prueba\\one.md",
      "src\\prueba\\three.md",
      "src\\prueba\\two.md",
    ]);
})
});

// FUNCION  getLinks
describe('getLinks', () => {
  it('DEberia ser una función', () => {
    expect( typeof getLinks).toBe('function');
  })
})


//FUNCION readFiles
describe('readFile', () => {
  it('Deberia ser una función', () => {
    expect( typeof readFile).toBe('function');
  })

  it("Deberia resolver la promesa ,cuando al leer el archivo es exitoso", ()=>{
    const filePath = "src/prueba/one.md";
    expect(readFile(filePath)).toBeInstanceOf(Promise);   
  });

  it("Deberia rechazar la promesa si ocurre un error al leer el archivo", () => {
    return readFile("/leerArchivo/noexiste.md").catch((error) => {
      expect(error.code).toBe("ENOENT");
    });
  });
})

// FUNCION readAllMds
describe('readAllMds', () => {
  it('Deberia ser una funcion', () =>{
    expect( typeof readAllMds).toBe('function');
  })
})

// FUNCION stats
describe('stats', () => {
  it('Deberia ser una funcion', () =>{
    expect( typeof stats).toBe('function');
  })
})

// FUNCION statsBroquen
describe('statsBroken', () => {
  it('Deberia ser una funcion', () =>{
    expect( typeof statsBroken).toBe('function');
  })
})