 # Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Por qué usar mdLinks](#3-objetivos-de-aprendizaje)
* [4. Diagrama de flujo para la validación de enlaces en archivos Markdown][Diagrama de Flujo]



* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.



## 2. Resumen del proyecto

mdLinks es una herramienta de línea de comandos desarrollada en Node.js que te permite analizar archivos Markdown y extraer información sobre los enlaces presentes en ellos. Esta herramienta facilita la tarea de verificar la validez de los enlaces y obtener detalles como la URL, el texto del enlace y el estado de cada enlace.

## 3. Por qué usar mdLinks

mdLinks ofrece una variedad de características que hacen que el análisis de enlaces en archivos Markdown sea sencillo y eficiente:

Información detallada: mdLinks proporciona detalles específicos sobre cada enlace.

Ahorro de tiempo: Con mdLinks, puedes analizar rápidamente tus archivos Markdown y obtener información sobre los enlaces sin tener que hacerlo manualmente.

## 4. Diagrama de flujo para la validación de enlaces en archivos Markdown

![Diagrama de Flujo](../images/mdLinks.png)


## 5. Guía de uso e instalación de la librería

##  Instalación

Módulo instalable via
npm install andrenavas/DEV005-md-links

## Opciones de Uso

El ejecutable de nuestra aplicación puede ejecutarse de la siguiente manera a través de la terminal:

## Opció de Uso 1
md-links <path-to-file> [options]

##### Valor de retorno

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

##### Ejemplo:




 






























