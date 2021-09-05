// 1.- crear una constante para importar la libreria axios.  Esta librería permite conectarse a una API
const axios = require('axios');

const fs = require('fs');

// Poner la línea de argumentos en un arreglo para manejarlo con mas facilidad
// el 0 es el NODE y el 1 es el programa.  Luego recibe 4 argumentos:
// 2: Nombre de archivo, 3: extensión de archivo, 4: divisa, 5: cantidad en pesos
const argumentos = process.argv;  

console.log(`Archivo: ${argumentos[2]}.${argumentos[3]} / Se van a cambair ${argumentos[5]} pesos en ${argumentos[4]}`);

const urlIndicadores = `https://mindicador.cl/api/${argumentos[4]}`

axios.get(urlIndicadores)
    .then((response) => {
        const divisa = response.data.serie[0];
        crearArchivo(`${argumentos[2]}.${argumentos[3]}`, divisa, argumentos[4], argumentos[5]);
    })
    .catch((error) => {
        console.log("Hubo un error: ", error);
    })


function crearArchivo(nombre, tipoCambio, divisa, pesos) {
    mensaje = "";
    mensaje += `A la fecha: ${tipoCambio.fecha}\n`;
    mensaje += `Fue realizada la cotizacion con los siguientes datos: \n`;
    mensaje += `Cantidad de pesos a convertir: ${pesos} pesos\n`
    mensaje += `Convertido a "${divisa}" da un total de: ${parseFloat(pesos) / parseFloat(tipoCambio.valor)}.\n`
    mensaje += `Se utilizó una tasa de cambio de ${tipoCambio.valor} pesos por ${divisa}`
    
    fs.writeFile(nombre, mensaje, 'utf8', (err) => {
        if (err){
            console.log("Error al crear archivo");
            throw err;
        };
        console.log("Archivo creado satisfactoriamente");
        console.log(mensaje);
    });
}