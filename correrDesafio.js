// Iportar la librería Child_Process para poder ejecutar un comando externo
const child_process = require("child_process");

// Crear las variables para que sean pasadas como argumentos a la llamada del progrma desafio
const nombreArchivoDesafio = "desafio.js"
const nombreArchivoSalida = "salida02";
const extensionArchivo = "txt";
const divisa = "dolar";
const cantidadPesos = 2000;

// Se crea la línea de comando como un string con toda la información
const comando = `${nombreArchivoDesafio} ${nombreArchivoSalida} ${extensionArchivo} ${divisa} ${cantidadPesos}`

// Función para ejecutar el archivo desafío y pasarle los parámetros correspondientes
function ejecutar(comando) {
    // Se retorna un apromesa porque el proceso (child_process) es asíncrono
    return new Promise((resolve) => {
        // Se ejecuta el llamado al archivo desafio
        child_process.exec(`node ${comando}`, function (err, result) {
            resolve(result);
        });
    });
}


// Se hace elllamdo a la función ejecutar para correr el dsafio
ejecutar(comando).then((salida) => {
  console.log(salida);
});

