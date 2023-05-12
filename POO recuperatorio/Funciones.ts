import { Alumno } from "./Alumno";
import { Profesor } from "./Profesor";
import { Materia } from "./Materia";

const readLineSync = require("readline-sync");
const fs = require("fs");

function ListadoAlumnos(): Alumno[]{
  return JSON.parse(fs.readFileSync("./src/Alumnos.json"));
};

function ListadoProfesores(): Profesor[]{
  return JSON.parse(fs.readFileSync("./src/Profesores.json"));
};

function ListadoDeMaterias(): Materia[]{
  return JSON.parse(fs.readFileSync("./src/Materias.json"));
};

function ListaNombreProfesores(){
  const listado: Profesor[] = ListadoProfesores();
 return console.table(listado.sort((x, y) => x.apellido.localeCompare(y.apellido)),["apellido","nombre","dni"]);
};

function ListaNombreAlumnos(){
  const listado: Alumno[] = ListadoAlumnos();
  console.table(listado.sort((x, y) => x.apellido.localeCompare(y.apellido)),["apellido","nombre","dni"]);
  return listado;
};

function ListaNombreMaterias(){
  const listado: Materia[] = ListadoDeMaterias();
  let listaNombreMaterias: string[] = [];
  listaNombreMaterias = listado.map((materia) => materia.nombre);
  return listaNombreMaterias;
};

function ListaAlumnosXProfesor(){
  const nombre: string = readLineSync.question("Nombre Profesor: ");
  const apellido: string = readLineSync.question("Apellido Profesor: ");
  const dni: number = Number(readLineSync.question("Dni Profesor: "));
  let alumnosXProfesor: string[];
  const profesorEncontrado: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
  if (profesorEncontrado.length === 1){
    const profesorAlumnos: Profesor = profesorEncontrado[0];
    alumnosXProfesor = profesorAlumnos.alumnos;
    if (alumnosXProfesor.length > 0) {
      return console.table(alumnosXProfesor.sort());
    } else
      return console.log("\u001B[44m" + "Sin Alumnos Alistados" + "\u001B[0m");
  }
  if (profesorEncontrado.length > 1){
    console.log("\u001B[44m" + "Mas de un Profesor coincide con la busqueda" + "\u001B[0m");
  } else console.log("\u001B[41m" + "Profesor No Encontrado" + "\u001B[0m");
};

function ListaProfesoresXAlummno(){
  const nombre: string = readLineSync.question("Nombre Alumno: ");
  const apellido: string = readLineSync.question("Apellido Alumno: ");
  const dni: number = Number(readLineSync.question("Dni Alumno: "));
  const alumnoEncontrado: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
  if (alumnoEncontrado.length === 1){
    const alumnosProfesor: Alumno = alumnoEncontrado[0];
    const profesoresAlumno: string[] = alumnosProfesor.profesores;
    if (profesoresAlumno.length > 0){
      return console.table(profesoresAlumno.sort());
    } else
      return console.log("\u001B[44m" + "Sin Profesores Alistados" + "\u001B[0m");
  }
  if (alumnoEncontrado.length > 1){
    return console.log("\u001B[44m" + "Mas de un Alumno coincide con la busqueda" + "\u001B[0m");
  } else
    return console.log("\u001B[41m" + "Alumno No Encontrado" + "\u001B[0m");
};

function ListadoAlumnosPromedioTablaOrdenada(){
  const listado: Alumno[] = ListadoAlumnos()
  console.table( listado.sort((x, y) => x.apellido.localeCompare(y.apellido)),["apellido","nombre","promedio"])
};

function BuscarIntegrante(listaDeBusqueda: any[],nombre: string, apellido: string,dni: string){
  let integranteEncontrado = listaDeBusqueda.filter((integrante) => integrante.nombre === nombre);
  if (integranteEncontrado.length > 0 && apellido != "") {
    integranteEncontrado = integranteEncontrado.filter((integrante) => integrante.apellido === apellido);
  } else if (integranteEncontrado.length > 0 && dni != "0") {
    integranteEncontrado = listaDeBusqueda.filter((integrante) => integrante.dni.toString() === dni);
  } else if (integranteEncontrado.length < 1 && apellido != "") {
    integranteEncontrado = listaDeBusqueda.filter((integrante) => integrante.apellido === apellido);
  } else if (integranteEncontrado.length < 1 && dni != "0") {
    integranteEncontrado = listaDeBusqueda.filter((integrante) => integrante.dni.toString() === dni);
  } else if (integranteEncontrado.length > 0 && dni != "0") {
    integranteEncontrado = integranteEncontrado.filter((integrante) => integrante.dni.toString() === dni);
  }
  return integranteEncontrado;
};

function MateriasDisponibles(): string[]{
  const listaMaterias: Materia[] = ListadoDeMaterias();
  let listaMateriasDispoible: string[] = [];
  for (let i = 0; i < ListadoDeMaterias().length; i++){
    const listaPro: Profesor[] = ListadoProfesores();
    let indiceEle = listaPro.findIndex((profesor) => profesor.materiaDictada === listaMaterias[i].nombre);
    if (indiceEle === -1){
      listaMateriasDispoible.splice(0, 0, listaMaterias[i].nombre);
    }
  }
  return listaMateriasDispoible;
};

function AltaAlumno(){
  //pido Datos para crear Alumno
  const nombre: string = readLineSync.question("Nombre Alumno: ");
  const apellido: string = readLineSync.question("Apellido Alumno: ");
  const dni: number = Number(readLineSync.question("Dni Alumno: "));
  const contacto: string = readLineSync.question("Contacto Alumno: ");
  const nuevoAlumno = new Alumno(nombre, apellido, dni, contacto);
  //compruebo que no exista en el litado y si no es asi, lo gaurdo en el Json
  const verificacion: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
  if (verificacion.length === 0){
    const alumno1 = [...ListadoAlumnos(), nuevoAlumno];
    fs.writeFileSync("./src/Alumnos.Json", JSON.stringify(alumno1, null, 2));
  } else console.log("\u001B[44m" + "Alumno Ya Inscripto" + "\u001B[0m");
};

function AltaProfesor(){
  //pido Datos para crear Profesor
  const nombre: string = readLineSync.question("Nombre Profesor: ");
  const apellido: string = readLineSync.question("Apellido Profesor: ");
  const dni: number = Number(readLineSync.question("Dni Profesor: "));
  const contacto: string = readLineSync.question("Contacto Profesor: ");
  // verifico que profesor no exista en el listado
  const verificacion: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
  if (verificacion.length === 0){
    //verifico que halla materia para tomar
    if (MateriasDisponibles().length != 0){
      // const arrayOpciones1 = MateriasDisponibles();
      let arrayOpciones: string[] = new Array(MateriasDisponibles().length);
      arrayOpciones = MateriasDisponibles();
      //le paso las materias disponibles y creo el profesor
      let materiaElejir: number = readLineSync.keyInSelect(arrayOpciones,"Materias");
      let materiaDicatada: string = arrayOpciones[materiaElejir];
      if(materiaElejir === (-1)){materiaDicatada = ""};
      const nuevoProfesor = new Profesor(nombre, apellido, dni, contacto);
      nuevoProfesor.materiaDictada = materiaDicatada;
      const profesor1 = [...ListadoProfesores(), nuevoProfesor];
      fs.writeFileSync("./src/Profesores.Json",JSON.stringify(profesor1, null, 2));
      //busco los alumnos que estan en la materia
      const nuevoListadoAlumnos: Alumno[] = ListadoAlumnos();
      const alumnosXMateria: Alumno[] = nuevoListadoAlumnos.filter((alumno) => alumno.materias.some((materia) => materia.nombre === materiaDicatada));
      if (alumnosXMateria.length > 0){
        const nombreProfesorDictaMateria: string = `${nuevoProfesor.nombre}` + " " + `${nuevoProfesor.apellido}`;
        alumnosXMateria.map((alumno) => alumno.profesores.push(nombreProfesorDictaMateria));
        const nombresAlumnos = alumnosXMateria.map((alumno) => alumno.nombre);
        const apellidosAlumnos = alumnosXMateria.map((alumno) => alumno.apellido);
        let nomApellAlumn1: string;
        //creo los nombres con apellido de los alumnos que estan alistados y se los paso al nuevo profesor
        for (let i = 0; i < nombresAlumnos.length; i++) {
          nomApellAlumn1 = `${nombresAlumnos[i]} ${apellidosAlumnos[i]}`;
          nuevoProfesor.alumnos.push(nomApellAlumn1);
        }
        fs.writeFileSync("./src/Alumnos.json",JSON.stringify(nuevoListadoAlumnos, null, 2));
        // const profesor1 = [...ListadoProfesores(), nuevoProfesor];
        fs.writeFileSync("./src/Profesores.Json",JSON.stringify(profesor1, null, 2));
      }
    } else return console.log("\u001B[44m" + "Sin Vacantes" + "\u001B[0m");
  } else console.log("\u001B[41m" + "Profesor Ya Inscrito" + "\u001B[0m");
};

function AltaMateria(){
  const nombreMateria = readLineSync.question("Nombre Materia: ");
  const nuevaMateria = new Materia(nombreMateria);
  const arrayBusqueda: Materia[] = ListadoDeMaterias();
  const indexMateria = arrayBusqueda.findIndex((materia) => materia.nombre === nombreMateria);
  if (indexMateria == -1){
    const materias = [...ListadoDeMaterias(), nuevaMateria];
    fs.writeFileSync("./src/Materias.Json",JSON.stringify(materias, null, 2));
  } else console.log("\u001B[41m" + "Materia Existente" + "\u001B[0m");
};

function DatosIntegrante(tipoIntegrante: string){
  const nombre: string = readLineSync.question("Nombre" + " " + `${tipoIntegrante}` + ": ");
  const apellido: string = readLineSync.question("Apellido" + " " + `${tipoIntegrante}` + ": ");
  const dni: number = Number(readLineSync.question("Dni" + " " + `${tipoIntegrante}` + ": "));
  switch (tipoIntegrante){
    case "Alumno":
      const alumnoBusqueda: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
      if (alumnoBusqueda.length === 1){
        const alumnoDato: Alumno = alumnoBusqueda[0];
        return console.log(alumnoDato);
      }
      if (alumnoBusqueda.length > 1){
        return console.log("\u001B[44m" +"Mas de Alumno coincide con la busqueda(Especifique Datos)" +"\u001B[0m");
      }
      if (alumnoBusqueda.length === 0){
        return console.log("\u001B[41m" + "Ningun Alumno coincide con los Datos" + "\u001B[0m");
      }
      break;

    case "Profesor":
      const profesorBusqueda: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
      if (profesorBusqueda.length === 1){
        const profesorDato: Profesor = profesorBusqueda[0];
        return console.log(profesorDato);
      }
      if (profesorBusqueda.length > 1){
        return console.log("\u001B[44m" + "Mas de un Profesor coincide con los Datos(Especifique Datos)" +"\u001B[0m");
      }
      if (profesorBusqueda.length === 0){
        return console.log("\u001B[41m" + "Ningun Profesor coincide con los Datos" + "\u001B[0m");
      }
      break;
  }
}

function ModificarDatos(tipoIntegrante: string){
  const nombre: string = readLineSync.question("Nombre" + " " + `${tipoIntegrante}` + ": ");
  const apellido: string = readLineSync.question("Apellido" + " " + `${tipoIntegrante}` + ": ");
  const dni: number = Number(readLineSync.question("Dni" + " " + `${tipoIntegrante}` + ": "));
  switch (tipoIntegrante){
    case "Alumno":
      const alumnoBusqueda: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
      if (alumnoBusqueda.length === 1){
        const alumnoDato: Alumno = alumnoBusqueda[0];
        const idAlumnoDato: string = alumnoDato.idAlumno;
        const nuevoListadoAlumnos: Alumno[] = ListadoAlumnos();
        const ubicacionAlumnoDato: number = nuevoListadoAlumnos.findIndex((alumno) => alumno.idAlumno === idAlumnoDato);
        const alumnoX = `${nuevoListadoAlumnos[ubicacionAlumnoDato].nombre}` + " " + `${nuevoListadoAlumnos[ubicacionAlumnoDato].apellido}`;
        let indiceProfesor: number = ListadoProfesores().findIndex((profesor) => profesor.alumnos.includes(alumnoX));
        const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
        const arrayDatos: string[] = ["Nombre", "Apellido", "Dni", "Contacto"];
        const datoModificar: string = arrayDatos[readLineSync.keyInSelect(arrayDatos)];
        switch (datoModificar){
          case "Nombre":
            alumnoDato.nombre = readLineSync.question("Nombre: ");
            nuevoListadoAlumnos.splice(ubicacionAlumnoDato, 1, alumnoDato);
            fs.writeFileSync("./src/Alumnos.json",JSON.stringify(nuevoListadoAlumnos, null, 2));
            const alumnoNuevoNombre: string = `${nuevoListadoAlumnos[ubicacionAlumnoDato].nombre}` + " " + `${nuevoListadoAlumnos[ubicacionAlumnoDato].apellido}`; 
              while(indiceProfesor != (-1)){
                const profesorQuitarAlumno: Profesor = nuevoListadoProfesores[indiceProfesor];
                const ubicacionAlumnoEnProfesor: number = profesorQuitarAlumno.alumnos.indexOf(alumnoX);
                profesorQuitarAlumno.alumnos.splice(ubicacionAlumnoEnProfesor,1,alumnoNuevoNombre);
                fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
                indiceProfesor = ListadoProfesores().findIndex((profesor) => profesor.alumnos.includes(alumnoX));
              }
            break;
          case "Apellido":
            alumnoDato.apellido = readLineSync.question("Apellido: ");
            nuevoListadoAlumnos.splice(ubicacionAlumnoDato, 1, alumnoDato);
            fs.writeFileSync("./src/Alumnos.json",JSON.stringify(nuevoListadoAlumnos, null, 2));
            const alumnoNuevoApellido = `${nuevoListadoAlumnos[ubicacionAlumnoDato].nombre}` + " " + `${nuevoListadoAlumnos[ubicacionAlumnoDato].apellido}`; 
              while(indiceProfesor != (-1)){
                const profesorQuitarAlumno: Profesor = nuevoListadoProfesores[indiceProfesor];
                const ubicacionAlumnoEnProfesor: number = profesorQuitarAlumno.alumnos.indexOf(alumnoX);
                profesorQuitarAlumno.alumnos.splice(ubicacionAlumnoEnProfesor,1,alumnoNuevoApellido);
                fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
                indiceProfesor = ListadoProfesores().findIndex((profesor) => profesor.alumnos.includes(alumnoX));
              }
            break;
          case "Dni":
            alumnoDato.dni = Number(readLineSync.question("Dni: "));
            break;
          case "Contacto":
            alumnoDato.contacto = readLineSync.question("Contacto: ");
        }
        nuevoListadoAlumnos.splice(ubicacionAlumnoDato, 1, alumnoDato);
        fs.writeFileSync("./src/Alumnos.json",JSON.stringify(nuevoListadoAlumnos, null, 2));
        return console.log(alumnoDato);
      }
      if (alumnoBusqueda.length > 1){
        return console.log("\u001B[44m" +"Mas de un Alumno coincide con los Datos(Especifique Datos)" +"\u001B[0m");
      }
      if (alumnoBusqueda.length === 0){
        return console.log("\u001B[41m" + "Ningun Alumno coincide con los Datos" + "\u001B[0m");
      }
      break;

    case "Profesor":
      const profesorBusqueda: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
      if (profesorBusqueda.length === 1) {
        const profesorDato: Profesor = profesorBusqueda[0];
        const idProfesorDato: string = profesorDato.idProfesor;
        const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
        const ubicacionProfesorDato: number = nuevoListadoProfesores.findIndex((profesor) => profesor.idProfesor === idProfesorDato);
        const profesorX =`${profesorBusqueda[0].nombre}` + " " + `${profesorBusqueda[0].apellido}`;
        const nuevoListadoAlmnos: Alumno[] = ListadoAlumnos();
        let indiceAlumno: number = nuevoListadoAlmnos.findIndex((alumno) => alumno.profesores.includes(profesorX));

        const arrayDatos: string[] = ["Nombre", "Apellido", "Dni", "Contacto"];
        const datoModificar: string = arrayDatos[readLineSync.keyInSelect(arrayDatos)];
        switch (datoModificar){
          case "Nombre":
            profesorDato.nombre = readLineSync.question("Nombre: ");
            nuevoListadoProfesores.splice(ubicacionProfesorDato, 1, profesorDato);
            fs.writeFileSync("./src/Profesores.json",JSON.stringify(nuevoListadoProfesores, null, 2));
            const profesorNuevoNombre: string = `${profesorBusqueda[0].nombre}` + " " + `${profesorBusqueda[0].apellido}`;  
            while(indiceAlumno != (-1)){
              const alumnoQuitarProfesor: Alumno = nuevoListadoAlmnos[indiceAlumno];
              const ubicacionProfesorEnAlumno: number = alumnoQuitarProfesor.profesores.indexOf(profesorX);
              alumnoQuitarProfesor.profesores.splice(ubicacionProfesorEnAlumno,1,profesorNuevoNombre);
              fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlmnos, null, 2));
              indiceAlumno = ListadoAlumnos().findIndex((alumno) => alumno.profesores.includes(profesorX));
            }

            break;
          case "Apellido":
            profesorDato.apellido = readLineSync.question("Apellido: ");
            fs.writeFileSync("./src/Profesores.json",JSON.stringify(nuevoListadoProfesores, null, 2));
            const profesorNuevoApellido: string = `${profesorBusqueda[0].nombre}` + " " + `${profesorBusqueda[0].apellido}`;  
            while(indiceAlumno != (-1)){
              const alumnoQuitarProfesor: Alumno = nuevoListadoAlmnos[indiceAlumno];
              const ubicacionProfesorEnAlumno: number = alumnoQuitarProfesor.profesores.indexOf(profesorX);
              alumnoQuitarProfesor.profesores.splice(ubicacionProfesorEnAlumno,1,profesorNuevoApellido);
              fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlmnos, null, 2));
              indiceAlumno = ListadoAlumnos().findIndex((alumno) => alumno.profesores.includes(profesorX));
            }
            break;
          case "Dni":
            profesorDato.dni = Number(readLineSync.question("Dni: "));
            break;
          case "Contacto":
            profesorDato.contacto = readLineSync.question("Contacto: ");
        }
        nuevoListadoProfesores.splice(ubicacionProfesorDato, 1, profesorDato);
        fs.writeFileSync("./src/Profesores.json",JSON.stringify(nuevoListadoProfesores, null, 2));
        return console.log(profesorDato);
      }
      if (profesorBusqueda.length > 1){
        return console.log("\u001B[44m" +"Mas de un Profesor coincide con los Datos(Especifique Datos)" +"\u001B[0m");
      }
      if (profesorBusqueda.length === 0){
        return console.log("\u001B[41m" + "Ningun Profesor coincide con los Datos" + "\u001B[0m");
      }
      break;
  }
};

function BajaAlumno() {
  const nombre: string = readLineSync.question("Nombre Alumno: ");
  const apellido: string = readLineSync.question("Apellido Alumno: ");
  const dni: number = Number(readLineSync.question("Dni Alumno: "));
  const alumnoBusqueda: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
  if (alumnoBusqueda.length === 1){
    //busco la ubicacion del alumno x id y lo elimino
    const alumnoId: string = alumnoBusqueda[0].idAlumno;
    const ubicacionAlumno: number = ListadoAlumnos().findIndex((alumno) => alumno.idAlumno === alumnoId);
    const arrayNuevaListaAlumnos: Alumno[] = ListadoAlumnos();
    arrayNuevaListaAlumnos.splice(ubicacionAlumno, 1);
    fs.writeFileSync("./src/Alumnos.json",JSON.stringify(arrayNuevaListaAlumnos, null, 2));
    //busco los profesores que tenian a cargo a este alumno
    const alumnoX = `${alumnoBusqueda[0].nombre}` + " " + `${alumnoBusqueda[0].apellido}`;
    const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
    let indiceProfesor: number = ListadoProfesores().findIndex((profesor) => profesor.alumnos.includes(alumnoX));
      while(indiceProfesor != (-1)){
        const profesorQuitarAlumno: Profesor = nuevoListadoProfesores[indiceProfesor];
        const ubicacionAlumnoEnProfesor: number = profesorQuitarAlumno.alumnos.indexOf(alumnoX);
        profesorQuitarAlumno.alumnos.splice(ubicacionAlumnoEnProfesor,1);
        fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
        indiceProfesor = ListadoProfesores().findIndex((profesor) => profesor.alumnos.includes(alumnoX));
      }
  }
  if (alumnoBusqueda.length > 1){
    return console.log("\u001B[44m" +"Mas de un Alumno coincide con los Datos(Especifique Datos)" +"\u001B[0m");
  }
  if (alumnoBusqueda.length === 0){
    return console.log("\u001B[41m" + "Ningun Alumno coincide con los Datos" + "\u001B[0m");
  }
};

function BajaProfesor() {
  const nombre: string = readLineSync.question("Nombre Profesor: ");
  const apellido: string = readLineSync.question("Apellido Profesor: ");
  const dni: number = Number(readLineSync.question("Dni Profesor: "));
  const profesorBusqueda: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
  if (profesorBusqueda.length === 1){
    const profesorId: string = profesorBusqueda[0].idProfesor;
    const ubicacionProfesor: number = ListadoProfesores().findIndex((profesor) => profesor.idProfesor === profesorId);
    const arrayNuevaListaProfesores: Profesor[] = ListadoProfesores();
    arrayNuevaListaProfesores.splice(ubicacionProfesor, 1);
    fs.writeFileSync("./src/Profesores.json",JSON.stringify(arrayNuevaListaProfesores, null, 2));
    //busco los alumnos que tenia a este profesor
    const profesorX =`${profesorBusqueda[0].nombre}` + " " + `${profesorBusqueda[0].apellido}`;
    const nuevoListadoAlmnos: Alumno[] = ListadoAlumnos();
    let indiceAlumno: number = nuevoListadoAlmnos.findIndex((alumno) => alumno.profesores.includes(profesorX));
    while(indiceAlumno != (-1)){
      const alumnoQuitarProfesor: Alumno = nuevoListadoAlmnos[indiceAlumno];
      const ubicacionProfesorEnAlumno: number = alumnoQuitarProfesor.profesores.indexOf(profesorX);
      alumnoQuitarProfesor.profesores.splice(ubicacionProfesorEnAlumno,1);
      fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlmnos, null, 2));
      indiceAlumno = ListadoAlumnos().findIndex((alumno) => alumno.profesores.includes(profesorX));
    }
  }
  if (profesorBusqueda.length > 1){
    return console.log("\u001B[44m" +"Mas de un Profesor coincide con los Datos(Especifique Datos)" +"\u001B[0m");
  }
  if (profesorBusqueda.length === 0){
    return console.log("\u001B[41m" + "Ningun Profesor coincide con los Datos" + "\u001B[0m");
  }
};

function EliminarMateria(){
  const arrayOpciones: string[] = new Array(ListadoDeMaterias().length);
  ListaNombreMaterias().map((elemento) => arrayOpciones.push(elemento));
  const materiasElejir: number = readLineSync.keyInSelect(arrayOpciones,"Materias");
  if(materiasElejir != (-1)){
    //elimino materia
  const materiaEliminar: string = arrayOpciones[materiasElejir];
  let nuevoListadoDeMaterias: Materia[] = ListadoDeMaterias();
  const ubicacionMateriaEliminiar: number = nuevoListadoDeMaterias.findIndex((materia) => materia.nombre === materiaEliminar);
  nuevoListadoDeMaterias.splice(ubicacionMateriaEliminiar, 1);
  fs.writeFileSync("./src/Materias.Json",JSON.stringify(nuevoListadoDeMaterias, null, 2));
  //busco si algun profesor la dicta
  const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
  const indiceProfesorDictaMateria: number = nuevoListadoProfesores.findIndex((profesor) => profesor.materiaDictada === materiaEliminar);
  const profesorModificar: Profesor = nuevoListadoProfesores[indiceProfesorDictaMateria];
  //busco los alumnos que estan alistados a la materia
  const nuevoListadoAlumnos: Alumno[] = ListadoAlumnos();
  let indiceAlumno: number = nuevoListadoAlumnos.findIndex((alumno) => alumno.materias.some((materia) => materia.nombre === materiaEliminar));
  let alumnoModificar: Alumno = nuevoListadoAlumnos[indiceAlumno];
  while (indiceAlumno != -1){
    //mientras haya alumnos alistados
    alumnoModificar = nuevoListadoAlumnos[indiceAlumno];
    const materiasAlumnoModificar: Materia[] = alumnoModificar.materias;
    const ubicacionMateria: number = materiasAlumnoModificar.findIndex((materia) => materia.nombre === materiaEliminar);
    //le elimino la materia
    alumnoModificar.materias.splice(ubicacionMateria, 1);
    //y si tinen el profesor en su lista, tambien lo elimino
    const profesorEliminar = `${profesorModificar.nombre}` + " " + `${profesorModificar.apellido}`;
    const ubcacionProfesorDictaMateria = alumnoModificar.profesores.findIndex((profesor) => profesor === profesorEliminar);
    if(ubcacionProfesorDictaMateria != (-1)){
    alumnoModificar.profesores.splice(ubcacionProfesorDictaMateria, 1);
    };
    //recalculo el promedio sin la materia eliminada
    const arrayNotas: number[] = alumnoModificar.materias.map((materia) => materia.nota);
        let valorInicial: number = 0;
        const sumaNotas = arrayNotas.reduce((accumulator, currentValue) => accumulator + currentValue,valorInicial);
        let cantidadCeros: number = 0;
        alumnoModificar.materias.map((materia) => {if(materia.nota === 0){cantidadCeros++}});
        if(sumaNotas != 0){
        const promedio: number = sumaNotas / (alumnoModificar.materias.length - cantidadCeros);
        alumnoModificar.promedio = Number(promedio.toFixed(2));
        }
        if(sumaNotas === 0){alumnoModificar.promedio = 0};

    fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlumnos, null, 2));
    indiceAlumno = nuevoListadoAlumnos.findIndex((alumno) => alumno.materias.some((materia) => materia.nombre === materiaEliminar));
  }
  if (indiceProfesorDictaMateria != -1) {
    //elimino la materia en el profesor que la dictaba y sus alumnos
    profesorModificar.materiaDictada = "";
    profesorModificar.alumnos = [];
    //a cada alumno alistado, le elimino el profesor que dictaba la materia
    // const profesorEliminar = `${profesorModificar.nombre}` + " " + `${profesorModificar.apellido}`;
    // const ubcacionProfesorDictaMateria = alumnoModificar.profesores.findIndex((profesor) => profesor === profesorEliminar);
    // alumnoModificar.profesores.splice(ubcacionProfesorDictaMateria, 1);
    // fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlumnos, null, 2));
    nuevoListadoProfesores.splice(indiceProfesorDictaMateria,1,profesorModificar);
    fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
  }
}};

function AlistarMateria(){
  const nombre: string = readLineSync.question("Nombre Alumno: ");
  const apellido: string = readLineSync.question("Apellido Alumno: ");
  const dni: number = Number(readLineSync.question("Dni Alumno: "));
  const alumnoBusqueda: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre,apellido,dni.toString());
  const nuevoListadoAlumnos: Alumno[] = ListadoAlumnos();
  if (alumnoBusqueda.length === 1){
    //obtengo el alumno a alistar
    const alumnoAlistarMateria: Alumno = alumnoBusqueda[0];
    //le paso las materias existentes
    let arrayMateriasElejir: string[] = new Array(ListadoDeMaterias().length);
    arrayMateriasElejir = ListaNombreMaterias();
    const nombreMateriaElejida: string = arrayMateriasElejir[readLineSync.keyInSelect(arrayMateriasElejir)];
    const materiaAlistar: Materia = ListadoDeMaterias().find((materia) => materia.nombre === nombreMateriaElejida) as Materia;
    const verificacionMateriaAlistar = alumnoAlistarMateria.materias.findIndex((materia) => materia.nombre === nombreMateriaElejida);
    const idAlumnoAlistarMateria: string = alumnoAlistarMateria.idAlumno;
    const ubicacionAlumnoAlistarMateria: number = nuevoListadoAlumnos.findIndex((alumno) => alumno.idAlumno === idAlumnoAlistarMateria);
    //verifico que la materia no este alistada por este alumno
    if (verificacionMateriaAlistar === -1){
      //le agrego la materia
      alumnoAlistarMateria.materias.push(materiaAlistar);
      nuevoListadoAlumnos.splice(ubicacionAlumnoAlistarMateria,1,alumnoAlistarMateria);
      fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlumnos, null, 2));
      //busco el profesor que dicta la materia elejida. Si existe le agrego el alumno al listado y al alumno el profesor que dicta la materia a la que se alisto
      const indiceProfesor: number = ListadoProfesores().findIndex((profesor) => profesor.materiaDictada.includes(nombreMateriaElejida));
      if (indiceProfesor != -1) {
        const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
        const profesorDictaMateria: Profesor = nuevoListadoProfesores[indiceProfesor];
        const nombreApellidoAlumnoAlistado: string = `${alumnoAlistarMateria.nombre}` +" " +`${alumnoAlistarMateria.apellido}`;
        profesorDictaMateria.alumnos.push(nombreApellidoAlumnoAlistado);
        fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
        //agrego el profesor al listado de profesores del alumno
        const nombreProfesorDictaMateria: string = `${profesorDictaMateria.nombre}` +" " +`${profesorDictaMateria.apellido}`;
        alumnoAlistarMateria.profesores.push(nombreProfesorDictaMateria);
        nuevoListadoAlumnos.splice(ubicacionAlumnoAlistarMateria,1,alumnoAlistarMateria);
        fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlumnos, null, 2));
      }
    } else return console.log("\u001B[44m" + "Materia Ya Alistada" + "\u001B[0m");
  }if(alumnoBusqueda.length > 1){ 
    return console.log("\u001B[44m" +"Mas de un Alumno coincide con los Datos(Especifique Datos)" +"\u001B[0m");
  }
  if (alumnoBusqueda.length === 0){
    return console.log("\u001B[41m" + "Ningun Alumno coincide con los Datos" + "\u001B[0m");
  }
};

function TomarMateria(){
  const nombre: string = readLineSync.question("Nombre Profesor: ");
  const apellido: string = readLineSync.question("Apellido Profesor: ");
  const dni: number = Number(readLineSync.question("Dni Profesor: "));
  const profesorBusqueda: Profesor[] = BuscarIntegrante(ListadoProfesores(),nombre,apellido,dni.toString());
  if (profesorBusqueda.length === 1) {
    const profesorTomaMateria: Profesor = profesorBusqueda[0];
    const nuevoListadoProfesores: Profesor[] = ListadoProfesores();
    const ubicacionProfesor: number = nuevoListadoProfesores.findIndex((profesor) => profesor.idProfesor === profesorBusqueda[0].idProfesor);
    if (profesorTomaMateria.materiaDictada === "") {
      //le agrego la materia elejida
      let materiasDisponibles: string[] = new Array(MateriasDisponibles.length);
      materiasDisponibles = MateriasDisponibles();
      const materiaTomar: string = materiasDisponibles[readLineSync.keyInSelect(materiasDisponibles)];
      profesorTomaMateria.materiaDictada = materiaTomar;
      nuevoListadoProfesores.splice(ubicacionProfesor, 1, profesorTomaMateria);
      fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
      //busco si esa materia tiene alumnos alistados
      const nuevoListadoAlmnos: Alumno[] = ListadoAlumnos();
      const alumnosXMateria: Alumno[] = nuevoListadoAlmnos.filter((alumno) =>alumno.materias.some((materia) => materia.nombre === materiaTomar));
      if (alumnosXMateria.length > 0) {
        const nombreProfesorDictaMateria: string =`${profesorTomaMateria.nombre}` +" " +`${profesorTomaMateria.apellido}`;
        alumnosXMateria.map((alumno) =>alumno.profesores.push(nombreProfesorDictaMateria));
        const nombresAlumnos = alumnosXMateria.map((alumno) => alumno.nombre);
        const apellidosAlumnos = alumnosXMateria.map((alumno) => alumno.apellido);
        let nomApellAlumn1: string;
        //creo los nombres con apellido de los alumnos que estan alistados y se los paso al nuevo profesor
        for (let i = 0; i < nombresAlumnos.length; i++) {
          nomApellAlumn1 = `${nombresAlumnos[i]} ${apellidosAlumnos[i]}`;
          profesorTomaMateria.alumnos.push(nomApellAlumn1);
        }
        nuevoListadoProfesores.splice(ubicacionProfesor,1,profesorTomaMateria);
        fs.writeFileSync("./src/Profesores.Json",JSON.stringify(nuevoListadoProfesores, null, 2));
        fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(nuevoListadoAlmnos, null, 2));
      }
    }
    return 
  }
  if (profesorBusqueda.length > 1) {
    return console.log("\u001B[44m" +"Mas de un Profesor coincide con los Datos(Especifique Datos" +"\u001B[0m");
  }
  if (profesorBusqueda.length === 0) {
    return console.log("\u001B[41m" + "Ningun Profesor coincide con los Datos" + "\u001B[0m");
  }
};

function PonerNota(){
  const nombre: string = readLineSync.question("Nombre: ");
  const apellido: string = readLineSync.question("Apellido: ");
  const dni: number = Number(readLineSync.question("Dni: "));
  const alumnosNota: Alumno[] = BuscarIntegrante(ListadoAlumnos(),nombre, apellido,dni.toString());
  const alumnoNota: Alumno = alumnosNota[0];
  if (alumnosNota.length === 1 && alumnoNota.materias.length > 0){
    const arrayBusqueda = ListadoAlumnos();
    const ubicacion = arrayBusqueda.findIndex((alumno) => alumno.idAlumno == alumnoNota.idAlumno);
    const materiasAlumnoNota: Materia[] = alumnoNota.materias;
    let materiasAElejir: string[] = new Array(alumnoNota.materias.length);
    materiasAElejir = materiasAlumnoNota.map((materia) => materia.nombre);
    let materiaElejida: number = readLineSync.keyInSelect(materiasAElejir,"Seleccione Materia");
    const arrayMateriasRestantes: string[] = alumnoNota.materias.map((materia) => materia.nombre);
    while (materiaElejida != -1) {
        const materiaNota: Materia = materiasAlumnoNota[materiaElejida];
        const notasPosibles: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const nota: number = readLineSync.keyInSelect(notasPosibles, "Nota");
        alumnoNota.materias[materiaElejida].nota = nota + 1;
        const arrayAlumnoNota = ListadoAlumnos();
        arrayAlumnoNota.splice(ubicacion, 1, alumnoNota);
        fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(arrayAlumnoNota, null, 2));
        const arrayNotas: number[] = alumnoNota.materias.map((materia) => materia.nota);
        let valorInicial: number = 0;
        const sumaNotas = arrayNotas.reduce((accumulator, currentValue) => accumulator + currentValue,valorInicial);
        let cantidadCeros: number = 0;
        alumnoNota.materias.map((materia) => {if(materia.nota === 0){cantidadCeros++}});
        const promedio: number = sumaNotas / (alumnoNota.materias.length - cantidadCeros);
        alumnoNota.promedio = Number(promedio.toFixed(2));
        arrayAlumnoNota.splice(ubicacion, 1, alumnoNota);
        fs.writeFileSync("./src/Alumnos.Json",JSON.stringify(arrayAlumnoNota, null, 2));
        arrayMateriasRestantes.splice(materiaElejida,1,"\u001B[31m" +"Nota Ya Asignada"+ "\u001B[0m"+" "+`${arrayMateriasRestantes[materiaElejida]}`);
        materiaElejida = readLineSync.keyInSelect(arrayMateriasRestantes,"Seleccione Materia");
    } return 
  } if(alumnosNota.length > 1){
      return console.log("\u001B[44m" +"Mas de un Profesor coincide con los Datos(Especifique Datos" +"\u001B[0m")
  }
  if(alumnosNota.length === 0){
      return console.log("\u001B[41m" + "Ningun Profesor coincide con los Datos" + "\u001B[0m");
  } else console.log("\u001B[41m" + "Sin Materias Alistadas" + "\u001B[0m");
};


module.exports = {
  PonerNota,
  TomarMateria,
  AlistarMateria,
  EliminarMateria,
  BajaProfesor,
  BajaAlumno,
  DatosIntegrante,
  ModificarDatos,
  ListaNombreAlumnos,
  ListaNombreProfesores,
  ListaNombreMaterias,
  ListaAlumnosXProfesor,
  ListaProfesoresXAlummno,
  ListadoAlumnosPromedioTablaOrdenada,
  AltaAlumno,
  AltaProfesor,
  AltaMateria,
};

