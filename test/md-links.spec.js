const { mdLinks } = require("../src/index.js");
const { absolutePath } = require("../src/routeExist.js");
const { getFilesMd, readAllMds, validate } = require("../src/getFilesMd.js");

const path = require('path');


// FUNCIÓN mdLinks
describe("mdLinks", () => {
  it("Deberia ser una función", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("Deberia devolver una promesa", ()=>{
    const path1 = "src/prueba/one.md";
    expect(mdLinks(path1)).toBeInstanceOf(Promise);   
  });
  it("Deberia rechazar la promesa cuando la ruta no existe", () => {
    return mdLinks("/leerArchivo/noexiste.md").catch((error) => {
      expect(error.message).toBe("Error, la ruta no existe");
    });
  });
});


//FUNCIÓN absolutePath
describe('absolutePath', () => {
  it("Deberia ser una función", () => {
    expect(typeof absolutePath).toBe("function");
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


//FUNCION getFilesMd
describe('getFilesMd', () => {
  it("Deberia ser una función", () => {
    expect(typeof getFilesMd).toBe("function");
  });
describe('getFilesMd', () => {
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
  });
});
});


//FUNCION readAllMds
describe('readAllMds', () => {
  it('Debería ser una función', () => {
    expect(typeof readAllMds).toBe('function');
  });
  it('Deberia retornar un array de links', () => {
    const arrayFilesMd = ['C:\\DEV005-md-links\\src\\prueba\\one.md', 'C:\\DEV005-md-links\\src\\prueba\\three.md', 'C:\\DEV005-md-links\\src\\prueba\\two.md'];

    return readAllMds(arrayFilesMd).then((result) => {

      expect(result).toEqual([ {   
        href: 'https://www.google.com/',
        text: 'Enlace a Google',
        file: 'C:\\DEV005-md-links\\src\\prueba\\one.md'
      },
      {
        href: 'https://www.youtube.com/watch?v=95BFumHfwAA',
        text: 'Enlace a youtube',
        file: 'C:\\DEV005-md-links\\src\\prueba\\three.md'
      },
      {
        href: 'https://www.freecodecamp.org/',
        text: 'Enlace a freecodecamp',
        file: 'C:\\DEV005-md-links\\src\\prueba\\two.md'
      }]);
    });
  });
});


// FUNCION validate
it('debería validar los enlaces ,mostrarme href, text y file', () => {
  const arrayLinks = [
    { href: 'https://www.google.com', text: 'Enlace a Google', file: 'prueba/one.md' },
    { href: 'https://www.youtube.com/watch?v=95BFumHfwAA', text: 'Enlace a youtube', file: 'prueba/three.md' },
  ];
  // Mockear la función fetch para simular que la respuestas sea exitosa
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    statusText: 'OK'
  });
  // Llamar a la función 
  return validate(arrayLinks)
    .then(() => {
      expect(arrayLinks).toEqual([
        { href: 'https://www.google.com', text: 'Enlace a Google', file: 'prueba/one.md', status: 200, statusText: 'OK' },
        { href: 'https://www.youtube.com/watch?v=95BFumHfwAA', text: 'Enlace a youtube', file: 'prueba/three.md', status: 200, statusText: 'OK' },
      ]);
    });
});

