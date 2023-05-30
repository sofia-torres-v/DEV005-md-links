const { mdLinks } = require("../src/index.js");
const { absolutePath } = require("../src/routeExist.js");


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


