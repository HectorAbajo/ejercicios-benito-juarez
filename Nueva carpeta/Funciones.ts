import { Alumno } from './Alumno';
import { Integrante } from './Itegrante';
import { Profesor } from './Profesor';
import { Materia } from './Materia';

const readLineSync = require('readline-sync');
const fs = require('fs');

function ListadoProfesores(): Profesor[]{
    return JSON.parse( fs.readFileSync('./src/Profesores.json'))
}

function ListaNombreProfesores(): string []{
    const listado: Profesor[] = ListadoProfesores();
    let listaNombresProfesor: string[] = [];
    listaNombresProfesor = listado.map(profesor => profesor.nombre);
    return listaNombresProfesor;
}

function ListadoAlumnos(): Alumno[]{
    return JSON.parse( fs.readFileSync('./src/Alumnos.json'))
}

function ListaNombreAlumnos(): string []{
    const listado: Alumno [] = ListadoAlumnos();
    let listaNombres: string [] = [];
    listaNombres = listado.map((alumno) => alumno.nombre);
    return listaNombres
}

function ListadoAlumnosXProfesor(){
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: string = readLineSync.question("Dni: ");
    const profesorEncontrado: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni);
    if(profesorEncontrado.length === 1){
        const profesorAlumnos: Profesor = profesorEncontrado[0];
        const materiaQDicta: string = profesorAlumnos.materiaDictada;
        const materiaQDicta1: Materia = new Materia(materiaQDicta)
        const alumnosACargo = ListadoAlumnos().filter(alumno => alumno.materias.includes(materiaQDicta1))
        console.log(alumnosACargo)
    }
}

function ListadoDeMaterias(): Materia[]{
    return JSON.parse( fs.readFileSync('./src/Materias.json'))
}

function ListaNombreMaterias(){
    const listado : Materia[] = ListadoDeMaterias();
    let listaNombreMaterias: string[] = [];
    listaNombreMaterias = listado.map(materia => materia.nombre);
    return listaNombreMaterias
}

function BuscarIntegrante(listaDeBusqueda: any [], nombre: string, apellido: string, dni: string){
    let integranteEncontrado = listaDeBusqueda.filter(integrante => integrante.nombre === nombre);
        
    if((integranteEncontrado.length > 0) && (apellido != "")){
            integranteEncontrado = integranteEncontrado.filter(integrante => integrante.apellido === apellido)
    }
    else if((integranteEncontrado.length > 0) && (dni != "")) {
        integranteEncontrado = listaDeBusqueda.filter(integrante => (integrante.dni).toString() === dni)
    }      
    else if((integranteEncontrado.length < 1) && (apellido != "")){
            integranteEncontrado = listaDeBusqueda.filter(integrante => integrante.apellido === apellido) 
    }
    else if((integranteEncontrado.length < 1) && (dni != "")){
        integranteEncontrado = listaDeBusqueda.filter(integrante => (integrante.dni).toString() === dni) 
}
    else if((integranteEncontrado.length > 0) && (dni != "")){
        integranteEncontrado = integranteEncontrado.filter(integrante => (integrante.dni).toString() === dni) 
}
return integranteEncontrado
}

function AltaIntegrante(tipoIntegrante: string){
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: number = Number(readLineSync.question("Dni: "));
    const contacto: string = readLineSync.question("Contacto: ");
        if(tipoIntegrante === "alumno"){
            const nuevoAlumno = new Alumno(nombre, apellido, dni, contacto);
            const alumno1 = [...ListadoAlumnos(), nuevoAlumno];
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(alumno1,null,2));
        }
        else {
            const arrayLargo = ListaNombreMaterias().length ;
            const arrayOpciones = new Array(arrayLargo);
            ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));
            let materiaElejir =  readLineSync.keyInSelect(arrayOpciones,"Materias");
            let materiaDicatada1 = arrayOpciones[materiaElejir];
            let disponible = ListadoProfesores().find(profesor=> profesor.materiaDictada === materiaDicatada1);
            console.log(disponible);
            while (disponible != undefined){
                console.log("Materia Tomada")
                materiaElejir =  readLineSync.keyInSelect(arrayOpciones,"Materias");
                materiaDicatada1 = arrayOpciones[materiaElejir];
                disponible = ListadoProfesores().find(profesor=> profesor.materiaDictada === materiaDicatada1);
            }
            if(disponible === undefined){
            const materiaDicatada = materiaDicatada1
            const nuevoProfesor = new Profesor(nombre, apellido, dni, contacto, materiaDicatada);
            const profesor1 = [...ListadoProfesores(), nuevoProfesor];
            fs.writeFileSync('./src/Profesores.Json', JSON.stringify(profesor1,null,2));
        }
    }
}

function BajaIntegrante(ruta: string, arrayIntegrante: any[], nombre: string, apellido: string, dni: string){
    let integranteBaja = BuscarIntegrante(arrayIntegrante, nombre,apellido,dni);
    let ubicacion = -1;
        if(integranteBaja.length === 1){
            integranteBaja = integranteBaja[0];
            ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteBaja);
        }
        if(ubicacion >= 0){  
            arrayIntegrante.splice(ubicacion, 1);
        } else console.log("Integrante no encontrado");
    fs.writeFileSync(ruta, JSON.stringify(arrayIntegrante,null,2));
return arrayIntegrante
}

function ModificarDatos(tipoIntegrante: string, arrayIntegrante: any[], nombre: string, apellido: string, dni: string,dato?:string){
    let integranteModificar = BuscarIntegrante(arrayIntegrante, nombre,apellido,dni);
    let ubicacion = -1;
        if(integranteModificar.length === 1){
            integranteModificar = integranteModificar[0];
            ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteModificar);
        }
        if(ubicacion >= 0){  
        const opcinesPropiedad = ["Nombre","Apellido","Dni","Contacto"];
        const propiedad: number = readLineSync.keyInSelect(opcinesPropiedad,"Dato A Modificar ");
        const nuevoDato: string = readLineSync.question("Escriba Nuevo Valor de Dato: ");
        if(tipoIntegrante === "alumno"){
        let integranteModificar1: Alumno = ListadoAlumnos()[ubicacion]
        switch(opcinesPropiedad[propiedad]|| dato){
                    case "Nombre" :
                        integranteModificar1.nombre = nuevoDato;
                        break;
                    case "Apellido" :
                        integranteModificar1.apellido = nuevoDato;
                        break;
                    case "Dni" :
                        integranteModificar1.dni = Number(nuevoDato);
                        break;
                    case "Contacto" :
                        integranteModificar1.contacto = nuevoDato;
                    break;
                    case "Materias" :
                        integranteModificar1.contacto = nuevoDato;
                    break;
                    case "Promedio" :
                        integranteModificar1.contacto = nuevoDato;
                    break;
                    case "Profesores" :
                        integranteModificar1.contacto = nuevoDato;
                    break;
                    }
                    arrayIntegrante.splice(ubicacion, 1,integranteModificar1);
                    fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayIntegrante,null,2));
                }
        if(tipoIntegrante === "profesor"){
        let integranteModificar1: Profesor = ListadoProfesores()[ubicacion]
        switch(opcinesPropiedad[propiedad]||dato){
                    case "Nombre" :
                        integranteModificar1.nombre = nuevoDato;
                        break;
                    case "Apellido" :
                        integranteModificar1.apellido = nuevoDato;
                        break;
                    case "Dni" :
                        integranteModificar1.dni = Number(nuevoDato);
                        break;
                    case "Contacto" :
                        integranteModificar1.contacto = nuevoDato;
                        break;
                    case "Materia Dictada" :
                        integranteModificar1.contacto = nuevoDato;
                        break;
                    case "Alumnos" :
                        integranteModificar1.contacto = nuevoDato;
                        break
                }
                arrayIntegrante.splice(ubicacion, 1,integranteModificar1);
                    fs.writeFileSync('./src/Profesores.Json', JSON.stringify(arrayIntegrante,null,2));
            }
        } 
        
}

function CrearMateria(){
    const nombreMateria = readLineSync.question("Nombre Materia: ");
    const nuevaMateria = new Materia(nombreMateria);
    const arrayBusqueda: Materia[] = ListadoDeMaterias();
    const indexMateria = arrayBusqueda.findIndex(materia => materia.nombre === nombreMateria);
    if(indexMateria == (-1)){
        const materias = [...ListadoDeMaterias(), nuevaMateria];
        fs.writeFileSync('./src/Materias.Json', JSON.stringify(materias,null,2));
    }else console.log("Materia Existente")
    return indexMateria
    
}

function BuscarMateria(nombeMateria: string,arrayBusqueda:Materia[]){
    const indexMateria = arrayBusqueda.findIndex(materia => materia.nombre === nombeMateria);
    if(indexMateria != (-1)){
    console.log(arrayBusqueda[indexMateria]);
    }else console.log("Materia Inexistente")
    return indexMateria
}

function EliminarMateria(){
    const materiaEliminar = readLineSync.question("Materia a Eliminar: ")
    const indexMateriaEliminar = BuscarMateria(materiaEliminar,ListadoDeMaterias());
    if(indexMateriaEliminar != (-1)){
        const arrayBusqueda = ListadoDeMaterias();
        arrayBusqueda.splice(indexMateriaEliminar, 1);
        fs.writeFileSync('./src/Materias.Json', JSON.stringify(arrayBusqueda,null,2))
        console.log("Materia Eliminada");
    }
}

function AlistarseMateria(){
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: string = readLineSync.question("Dni: ");
    const arrayIntegrante: any[] = ListadoAlumnos();
    let integranteModificar: any[] = BuscarIntegrante(arrayIntegrante, nombre,apellido,dni);
    let ubicacion = -1;
        if(integranteModificar.length === 1){
            integranteModificar = integranteModificar[0];
            ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteModificar);
        }
        if(ubicacion >= 0){  
            const arrayLargo = ListaNombreMaterias().length;
            const arrayOpciones = new Array(arrayLargo);
            ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));
            const materiaElejir =  readLineSync.keyInSelect(arrayOpciones,"Materias");
            const materiaAlistada = arrayOpciones[materiaElejir];
            const nombreMateriAlistada: string = materiaAlistada;
            const materiaComprobar:Materia = materiaAlistada
            let alumnoModificar: Alumno = ListadoAlumnos()[ubicacion];
            if(alumnoModificar.materias.includes(materiaAlistada) === false){
            const materiasAlumno:Materia[] = alumnoModificar.materias;
            const profesorMateria:Profesor[] = ListadoProfesores().filter(profesor => profesor.materiaDictada === nombreMateriAlistada);
            const profesorMateria1:Profesor = profesorMateria[0];
            const nombreProfesorMateria: string = profesorMateria1.nombre ;
            alumnoModificar.profesores.push(nombreProfesorMateria);
            materiasAlumno.push(materiaAlistada);
            arrayIntegrante.splice(ubicacion, 1,alumnoModificar);
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayIntegrante,null,2));
            }else console.log("Materia ya Alistada")
        }
}

module.exports = {AlistarseMateria,ListaNombreAlumnos,ListaNombreProfesores,BuscarMateria,EliminarMateria,CrearMateria,BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores}
// console.log(BuscarIntegrante(ListadoAlumnos(),"","amaya",""))
// console.log(ListaNombreAlumnos())
// console.log(BajaIntegrante(ListadoAlumnos(),"miguel","amaya",""))
// const i1: Alumno[] = BuscarIntegrante(ListadoAlumnos(),"hector","abajo","")
// console.log(i1[0]);
// console.log(ListadoAlumnos())
// console.log(BuscarIndex(ListadoAlumnos(),i1[0]))
// console.log(ListaNombreMaterias())
ListadoAlumnosXProfesor()