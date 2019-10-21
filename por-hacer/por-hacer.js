const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    /*Pasa un objeto a formato json*/
    let data = JSON.stringify(listadoPorHacer);
    /*El writeFile 
    Primer argumento: nombre y ubicacion del archivo donde se va a guardar
    De no encontrar el archivo lo crea
    Segundo argumento: data que se va escribir en el archivo
    Tercer argumento: error que se debe manejar si no se puede guardar
    en el archivo*/
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puede grabar', err);
    });
}

const cargarDB = () => {
    /*Al hacer el require automaticamente detecta que es un archivo json
    y lo serializa si el archivo esta vacio va tirar un error por ello hacemos
    el try catch*/
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }


}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    /*El findIndex recibe un callback  y va ser un ciclo
    interno para cada uno de los elementos y yo puedo 
    obtener cada uno de los elementos en ese ciclo con una
    palabra clave que en este caso le voy a poner tarea*/
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
}