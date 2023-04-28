import { Alumno } from './Alumno';
import { Integrante } from './Itegrante';
import { Profesor } from './Profesor';
import { Materia } from './Materia';
import { MateriaNota } from './MateriaNota';

const readLineSync = require('readline-sync');
const fs = require('fs');

function ListadoProfesores(): Profesor[] {
    return JSON.parse(fs.readFileSync('./src/Profesores.json'))
}

function ListaNombreProfesores(): string[] {
    const listado: Profesor[] = ListadoProfesores();
    let listaNombresProfesor: string[] = [];
    listaNombresProfesor = listado.map(profesor => profesor.nombre);
    return listaNombresProfesor;
}

function ListadoAlumnos(): Alumno[] {
    return JSON.parse(fs.readFileSync('./src/Alumnos.json'))
}

function ListaNombreAlumnos(): string[] {
    const listado: Alumno[] = ListadoAlumnos();
    let listaNombres: string[] = [];
    listaNombres = listado.map((alumno) => alumno.nombre);
    return listaNombres
}

function ListadoAlumnosXProfesor(): any {
    const nombre: string = readLineSync.question("Nombre Profesor: ");
    const apellido: string = readLineSync.question("Apellido Profesor: ");
    const dni: string = readLineSync.question("Dni Profesor: ");
    const profesorEncontrado: Profesor[] = BuscarIntegrante(ListadoProfesores(), nombre, apellido, dni);
    if (profesorEncontrado.length === 1) {
        const profesorAlumnos: Profesor = profesorEncontrado[0];
        const alumnosProfe = profesorAlumnos.alumnos;
        // const materiaQDicta: string = profesorAlumnos.materiaDictada;
        // const materiaQDicta1: Materia = new Materia(materiaQDicta);
        // const alumnosACargo = ListadoAlumnos().filter(alumno => alumno.materias.includes(materiaQDicta1));
        return alumnosProfe;
    }
    if (profesorEncontrado.length > 1) {
        return console.log("Mas de un Profesor tiene estos Datos");
    } else return console.log("Profesor no Encontrado");
}

function ListaProfesoresXAlummno() {
    const nombre: string = readLineSync.question("Nombre Alumno: ");
    const apellido: string = readLineSync.question("Apellido Alumno: ");
    const dni: string = readLineSync.question("Dni Alumno: ");
    const alumnoEncontrado: Alumno[] = BuscarIntegrante(ListadoAlumnos(), nombre, apellido, dni);
    if (alumnoEncontrado.length === 1) {
        const alumnosProfesor: Alumno = alumnoEncontrado[0];
        const profesoresAlumno: string[] = alumnosProfesor.profesores;
        return profesoresAlumno
    }
    if (alumnoEncontrado.length > 1) {
        return console.log("Mas de un Alumno tiene estos Datos");
    } else return console.log("Alumno no Encontrado");
}

function ListadoDeMaterias(): Materia[] {
    return JSON.parse(fs.readFileSync('./src/Materias.json'));
}

function ListaNombreMaterias() {
    const listado: Materia[] = ListadoDeMaterias();
    let listaNombreMaterias: string[] = [];
    listaNombreMaterias = listado.map(materia => materia.nombre);
    return listaNombreMaterias;
}

function BuscarIntegrante(listaDeBusqueda: any[], nombre: string, apellido: string, dni: string) {
    let integranteEncontrado = listaDeBusqueda.filter(integrante => integrante.nombre === nombre);

    if ((integranteEncontrado.length > 0) && (apellido != "")) {
        integranteEncontrado = integranteEncontrado.filter(integrante => integrante.apellido === apellido);
    }
    else if ((integranteEncontrado.length > 0) && (dni != "")) {
        integranteEncontrado = listaDeBusqueda.filter(integrante => (integrante.dni).toString() === dni);
    }
    else if ((integranteEncontrado.length < 1) && (apellido != "")) {
        integranteEncontrado = listaDeBusqueda.filter(integrante => integrante.apellido === apellido);
    }
    else if ((integranteEncontrado.length < 1) && (dni != "")) {
        integranteEncontrado = listaDeBusqueda.filter(integrante => (integrante.dni).toString() === dni);
    }
    else if ((integranteEncontrado.length > 0) && (dni != "")) {
        integranteEncontrado = integranteEncontrado.filter(integrante => (integrante.dni).toString() === dni);
    }
    return integranteEncontrado;
}

function AltaIntegrante(tipoIntegrante: string) {
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
        //si es profesor,creo y paso las materias que tiene disponibles para tomar
        if (MateriasDisponibles().length != 0) {
            const arrayOpciones1 = MateriasDisponibles();
            let arrayOpciones = new Array(MateriasDisponibles().length)
            arrayOpciones = arrayOpciones1
            // const arrayLargo = ListaNombreMaterias().length;
            // const arrayOpciones = new Array(arrayLargo);
            // ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));

            let materiaElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
            let materiaDicatada1 = arrayOpciones[materiaElejir];
            // let disponible = ListadoProfesores().find(profesor => profesor.materiaDictada === materiaDicatada1);
            // while (disponible != undefined) {
            //     console.log("Materia Tomada")
            //     materiaElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
            //     materiaDicatada1 = arrayOpciones[materiaElejir];
            //     disponible = ListadoProfesores().find(profesor => profesor.materiaDictada === materiaDicatada1);
            // }
            // if (disponible === undefined) {
            const materiaDicatada = materiaDicatada1
            const nuevoProfesor = new Profesor(nombre, apellido, dni, contacto, materiaDicatada);
            //le paso los alumnos que estan en la materia que toma el nuevo profesor
            const alumnosXMateria = ListadoAlumnos().filter(alumno => alumno.materias.includes(materiaDicatada1));
            const nombresAlumnos = alumnosXMateria.map(alumno => alumno.nombre);
            const apellidosAlumnos = alumnosXMateria.map(alumno => alumno.apellido);
            let nomApellAlumn1: string
            //creo los nombres con apellido de los alumnos que estan alistados y se los paso al nuevo profesor
            for (let i = 0; i < nombresAlumnos.length; i++) {
                nomApellAlumn1 = `${nombresAlumnos[i]} ${apellidosAlumnos[i]}`;
                nuevoProfesor.alumnos.push(nomApellAlumn1)
            }

            const profesor1 = [...ListadoProfesores(), nuevoProfesor];
            fs.writeFileSync('./src/Profesores.Json', JSON.stringify(profesor1, null, 2));
        } else console.log("Sin Vacantes")
    }
}

function BajaIntegrante(ruta: string, arrayIntegrante: any[], nombre: string, apellido: string, dni: string) {
    let integranteBaja = BuscarIntegrante(arrayIntegrante, nombre, apellido, dni);
    let ubicacion = -1;
    if (integranteBaja.length === 1) {
        integranteBaja = integranteBaja[0];
        ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteBaja);
    }
    if (ubicacion >= 0) {
        arrayIntegrante.splice(ubicacion, 1);
    } else console.log("Integrante no encontrado");
    fs.writeFileSync(ruta, JSON.stringify(arrayIntegrante, null, 2));
    return arrayIntegrante
}

function ModificarDatos(tipoIntegrante: string, arrayIntegrante: any[], nombre: string, apellido: string, dni: string, dato?: string) {
    let integranteModificar = BuscarIntegrante(arrayIntegrante, nombre, apellido, dni);
    let ubicacion = -1;
    //compruebo que solo se alla encontrado 1 integrante con los datos proporcionados, si es asi, obtengo su indice
    if (integranteModificar.length === 1) {
        integranteModificar = integranteModificar[0];
        ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteModificar);
    }
    //si se encuentra dentro del listado, pido la propiedad a modificar y el dato a poner
    if (ubicacion >= 0) {
        const opcinesPropiedad = ["Nombre", "Apellido", "Dni", "Contacto"];
        const propiedad: number = readLineSync.keyInSelect(opcinesPropiedad, "Dato A Modificar ");
        const nuevoDato: string = readLineSync.question("Escriba Nuevo Valor de Dato: ");
        //si es un alumno, obtengo alumno y modifico ese alumno
        if (tipoIntegrante === "alumno") {
            let integranteModificar1: Alumno = ListadoAlumnos()[ubicacion]
            switch (opcinesPropiedad[propiedad]) {
                case "Nombre":
                    integranteModificar1.nombre = nuevoDato;
                    break;
                case "Apellido":
                    integranteModificar1.apellido = nuevoDato;
                    break;
                case "Dni":
                    integranteModificar1.dni = Number(nuevoDato);
                    break;
                case "Contacto":
                    integranteModificar1.contacto = nuevoDato;
                    break;
            }
            arrayIntegrante.splice(ubicacion, 1, integranteModificar1);
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayIntegrante, null, 2));
        }
        // si es profesor, obtengo profesor y modifico
        if (tipoIntegrante === "profesor") {
            let integranteModificar1: Profesor = ListadoProfesores()[ubicacion]
            switch (opcinesPropiedad[propiedad]) {
                case "Nombre":
                    integranteModificar1.nombre = nuevoDato;
                    break;
                case "Apellido":
                    integranteModificar1.apellido = nuevoDato;
                    break;
                case "Dni":
                    integranteModificar1.dni = Number(nuevoDato);
                    break;
                case "Contacto":
                    integranteModificar1.contacto = nuevoDato;
                    break;
            }
            arrayIntegrante.splice(ubicacion, 1, integranteModificar1);
            fs.writeFileSync('./src/Profesores.Json', JSON.stringify(arrayIntegrante, null, 2));
        }
    }

}

function CrearMateria() {
    const nombreMateria = readLineSync.question("Nombre Materia: ");
    const nuevaMateria = new Materia(nombreMateria);
    const arrayBusqueda: Materia[] = ListadoDeMaterias();
    const indexMateria = arrayBusqueda.findIndex(materia => materia.nombre === nombreMateria);
    if (indexMateria == (-1)) {
        const materias = [...ListadoDeMaterias(), nuevaMateria];
        fs.writeFileSync('./src/Materias.Json', JSON.stringify(materias, null, 2));
    } else console.log("Materia Existente")
    return indexMateria

}

function BuscarMateria(nombeMateria: string, arrayBusqueda: Materia[]) {
    const indexMateria = arrayBusqueda.findIndex(materia => materia.nombre === nombeMateria);
    if (indexMateria != (-1)) {
        console.log(arrayBusqueda[indexMateria]);
    } else console.log("Materia Inexistente")
    return indexMateria
}

function EliminarMateria() {
    //creo array de materias a eliminar
    const arrayLargo = ListaNombreMaterias().length;
    const arrayOpciones = new Array(arrayLargo);
    ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));
    const materiasElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
    const materiaEliminar = arrayOpciones[materiasElejir];
    //compruebo que la materia elejida este en el listado
    const indiceMateriaEliminar = BuscarMateria(materiaEliminar, ListadoDeMaterias());
    //si esta en el listado,la elimino del mismo
    if (indiceMateriaEliminar != (-1)) {
        const arrayBusquedaMateria = ListadoDeMaterias();
        arrayBusquedaMateria.splice(indiceMateriaEliminar, 1);
        fs.writeFileSync('./src/Materias.Json', JSON.stringify(arrayBusquedaMateria, null, 2));
        console.log("Materia Eliminada");
        //compruebo si un profesor dicta la materia a elimininar
        let indiceProfesorDicta: number = ListadoProfesores().findIndex(profesor => profesor.materiaDictada === materiaEliminar);
        const arrayModificarProf = ListadoProfesores();
        const profeDictaModificar = arrayModificarProf[indiceProfesorDicta];
        //si un profesor la dicta, la elimino de su lista
        if (indiceProfesorDicta != (-1)) {
            profeDictaModificar.materiaDictada = "";
            profeDictaModificar.alumnos = [];
            arrayModificarProf.splice(indiceProfesorDicta, 1, profeDictaModificar);
            fs.writeFileSync('./src/Profesores.Json', JSON.stringify(arrayModificarProf, null, 2));
            indiceProfesorDicta = ListadoProfesores().findIndex(profesor => profesor.materiaDictada === materiaEliminar);
        }
        //tambien la elimino de la lista de todos los alumnos alistados en ella
        let indiceAlumno = ListadoAlumnos().findIndex(alumno => alumno.materias.includes(materiaEliminar));
        while (indiceAlumno != (-1)) {
            indiceAlumno = ListadoAlumnos().findIndex(alumno => alumno.materias.includes(materiaEliminar));
            const arrayModificarAlum = ListadoAlumnos();
            const alumnoModificar = arrayModificarAlum[indiceAlumno];
            const materiasAlumModifi = alumnoModificar.materias;
            const materiaEliminar1: Materia = materiaEliminar;
            const indiceMateriaElim: number = materiasAlumModifi.indexOf(materiaEliminar1);
            materiasAlumModifi.splice(indiceMateriaElim, 1);
            //a cada alumno alistado, le elimino el proesor que dictaba la materia
            const profAlumModif = alumnoModificar.profesores;
            const nombreProfElim = profeDictaModificar.nombre;
            const apellidoProfElim = profeDictaModificar.apellido;
            const nombApellProfElim = nombreProfElim + " " + apellidoProfElim + "/";
            const indiceProfeElim = profAlumModif.indexOf(nombApellProfElim);
            profAlumModif.splice(indiceProfeElim, 1);
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayModificarAlum, null, 2));
            indiceAlumno = ListadoAlumnos().findIndex(alumno => alumno.materias.includes(materiaEliminar));
        }
    }
}

function AlistarseMateria() {
    //busco Alumno
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: string = readLineSync.question("Dni: ");
    const arrayIntegrante: any[] = ListadoAlumnos();
    let integranteModificar: any[] = BuscarIntegrante(arrayIntegrante, nombre, apellido, dni);
    let ubicacion = -1;
    //si es solo 1 alumno el que encuentra,busco su indice en el Listado
    if (integranteModificar.length === 1) {
        integranteModificar = integranteModificar[0];
        ubicacion = arrayIntegrante.findIndex(integrante => integrante === integranteModificar);
    }
    //comprueba que este en el array listado
    if (ubicacion >= 0) {
        //creo array materias con el largo predeterminado
        const arrayLargo = ListaNombreMaterias().length;
        const arrayOpciones = new Array(arrayLargo);
        ListaNombreMaterias().map(elemento => arrayOpciones.push(elemento));
        const materiaElejir = readLineSync.keyInSelect(arrayOpciones, "Materias");
        const materiaAlistada = arrayOpciones[materiaElejir];
        const nombreMateriAlistada: string = materiaAlistada;
        // const materiaComprobar: Materia = materiaAlistada
        //obtengo alumno del listadon con el indice obtenido y si no tiene la matria elejida, se la escribo
        let alumnoModificar: Alumno = ListadoAlumnos()[ubicacion];
        if (alumnoModificar.materias.includes(materiaAlistada) === false) {
            const materiasAlumno: Materia[] = alumnoModificar.materias;
            materiasAlumno.push(materiaAlistada);
            arrayIntegrante.splice(ubicacion, 1, alumnoModificar);
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayIntegrante, null, 2));
            //con el nombre de la materia busco el profesor que la dicta
            const profesoresMateria: Profesor[] = ListadoProfesores().filter(profesor => profesor.materiaDictada === nombreMateriAlistada);
            //si exixte el profesor,se lo agrego a la lista de profesores en el alumno
            if (profesoresMateria.length != 0) {
                const indiceProfesor: number = ListadoProfesores().findIndex(profesor => profesor.materiaDictada === nombreMateriAlistada);
                const profesorDictaMateria: Profesor = profesoresMateria[0];
                // console.log(ListadoProfesores());
                // console.log(profesorMateria1);
                // const indexProf: number = ListadoProfesores().indexOf(profesorMateria1);
                // console.log(indexProf);

                // const nombreProfesorMateria: string = profesorDictaMateria.nombre;

                const nombreProf: string = profesorDictaMateria.nombre;
                const apellidoProf: string = profesorDictaMateria.apellido;
                const nomApellProf: string = nombreProf + " " + apellidoProf + "/";
                alumnoModificar.profesores.push(nomApellProf);
                fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayIntegrante, null, 2));
                //tambien agrego el alumno a la lista de alumnos del profesor
                const nombreAl: string = alumnoModificar.nombre;
                const apellidoAl: string = alumnoModificar.apellido;
                const nomApellAlumn: string = nombreAl + " " + apellidoAl + "/";
                profesorDictaMateria.alumnos.push(nomApellAlumn);
                const listadoProfModificar = ListadoProfesores();
                listadoProfModificar.splice(indiceProfesor, 1, profesorDictaMateria);
                fs.writeFileSync('./src/Profesores.Json', JSON.stringify(listadoProfModificar, null, 2));
            }
        } else console.log("Materia ya Alistada")
    }
}

function MateriasDisponibles(): any[] {

    const listaMaterias: string[] = ListaNombreMaterias();
    let listaMateriasDispoible: string[] = []
    for (let i = 0; i < ListaNombreMaterias().length; i++) {
        const listaPro: Profesor[] = ListadoProfesores();
        let indiceEle = listaPro.findIndex(profesor => profesor.materiaDictada === listaMaterias[i]);
        if (indiceEle === (-1)) {
            listaMateriasDispoible.splice(0, 0, listaMaterias[i])
        }
    }
    return listaMateriasDispoible
}

function PonerNota(){
    const nombre: string = readLineSync.question("Nombre: ");
    const apellido: string = readLineSync.question("Apellido: ");
    const dni: string = readLineSync.question("Dni: ");
    const alumnosNota: Alumno[]= BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni);
    if(alumnosNota.length === 1){
        const alumnoNota: Alumno = alumnosNota[0];
        const arrayBusqueda = ListadoAlumnos();
        const ubicacion = arrayBusqueda.findIndex(alumno => alumno.idAlumno == alumnoNota.idAlumno);
        let materiasAlumnoNota: Materia[] = alumnoNota.materias;
        let materiaElejida = readLineSync.keyInSelect(materiasAlumnoNota, "Seleccione Materia");
        while (materiaElejida != (-1)){
            const materiaNota: Materia = materiasAlumnoNota[materiaElejida];
            const notasPosibles: number[] = [0,1,2,3,4,5,6,7,8,9,10]
            const nota: number = readLineSync.keyInSelect(notasPosibles, "Nota");
            const materiaNotaAlumno = new MateriaNota(materiaNota,nota);
            const arrayMateraNota = alumnoNota.materiaNota
            alumnoNota.materiaNota.push(materiaNotaAlumno)
            const arrayMateriasNota = materiasAlumnoNota
            console.log(alumnoNota.materias)
            arrayMateriasNota.splice(materiaElejida,1);
            if(arrayMateriasNota.length >= 1){
            materiaElejida = readLineSync.keyInSelect(arrayMateriasNota, "Seleccione Materia");
        }else materiaElejida = -1
            const arrayAlumnoNota = ListadoAlumnos();
            arrayAlumnoNota.splice(ubicacion, 1, alumnoNota);
            fs.writeFileSync('./src/Alumnos.Json', JSON.stringify(arrayAlumnoNota, null, 2));
        }
    }
}


module.exports = { MateriasDisponibles, ListaNombreMaterias, ListaProfesoresXAlummno, ListadoAlumnosXProfesor, AlistarseMateria, ListaNombreAlumnos, ListaNombreProfesores, BuscarMateria, EliminarMateria, CrearMateria, BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores }

// console.log(PonerNota())