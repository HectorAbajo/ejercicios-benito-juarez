import { Alumno } from './Alumno';
import { Integrante } from './Itegrante';
import { Profesor } from './Profesor';
import { Materia } from './Materia';
import { MateriaNota } from './MateriaNota';

const readLineSync = require('readline-sync');
const fs = require('fs');

const {ListaNombreMaterias, ListaProfesoresXAlummno, ListadoAlumnosXProfesor, AlistarseMateria, ListaNombreAlumnos, ListaNombreProfesores, BuscarMateria, EliminarMateria, CrearMateria, BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores } = require("./funciones.ts");

function AltaIntegrante1(tipoIntegrante: string) {
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: number = Number(readLineSync.question("Dni: "));
    const contacto: string = readLineSync.question("Contacto: ");
    if (tipoIntegrante === "alumno") {
        const nuevoAlumno = new Alumno(nombre, apellido, dni, contacto);
        const alumno1 = [...ListadoAlumnos(), nuevoAlumno];
        fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(alumno1, null, 2));
    }
    else {
        // const arrayLargo = ListaNombreMaterias().length;
        // const arrayOpciones = new Array(arrayLargo);
        // ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));
        const arrayOpciones = MateriasDisponibles();
        
        let materiaElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
        let materiaDicatada1 = arrayOpciones[materiaElejir];
        let disponible = ListadoProfesores().find(profesor => profesor.materiaDictada === materiaDicatada1);
        while (disponible != undefined) {
            console.log("Materia Tomada")
            materiaElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
            materiaDicatada1 = arrayOpciones[materiaElejir];
            disponible = ListadoProfesores().find(profesor => profesor.materiaDictada === materiaDicatada1);
        }
        if (disponible === undefined) {
            const materiaDicatada = materiaDicatada1
            const nuevoProfesor = new Profesor(nombre, apellido, dni, contacto, materiaDicatada);

            const alumnosXMateria = ListadoAlumnos().filter(alumno => alumno.materias.includes(materiaDicatada1));
            const nombresAlumnos = alumnosXMateria.map(alumno => alumno.nombre);
            const apellidosAlumnos = alumnosXMateria.map(alumno => alumno.apellido);
            let nomApellAlumn1: string
            for (let i = 0; i < nombresAlumnos.length; i++) {
                nomApellAlumn1 = `${nombresAlumnos[i]} ${apellidosAlumnos[i]}`;
                nuevoProfesor.alumnos.push(nomApellAlumn1)
            }

            const profesor1 = [...ListadoProfesores(), nuevoProfesor];
            fs.writeFileSync('./src/Profesores.Json', JSON.stringify(profesor1, null, 2));
        }
    }
}

function MateriasDisponibles(): any[]{

    const listaMaterias: string []= ListaNombreMaterias();
    let listaMateriasDispoible: string [] = []
    for (let i = 0; i < ListaNombreMaterias().length; i++){
        const listaPro: Profesor[] = ListadoProfesores();
        let indiceEle = listaPro.findIndex(profesor => profesor.materiaDictada === listaMaterias[i]);
        if(indiceEle != (-1)){
            listaMateriasDispoible.splice(0,0,listaMaterias[i])
        }
    }
    return listaMateriasDispoible
}


