
const readLineSync = require("readline-sync");
const fs = require("fs");
const {
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
} = require("./Funciones.ts");

export class Administracion {
  private listaOpciones: string[];

  public constructor() {
    this.listaOpciones = [
      "\u001B[3;32m"+ "Alumno/s" +"\u001B[0m",
      "\u001B[3;32m"+ "Profesor/es" +"\u001B[0m",
      "\u001B[3;32m"+ "Materia/s" +"\u001B[0m",
      "\u001B[3;32m"+ "Listados" +"\u001B[0m",
    ];
  }

  public Entrar() {
    let opcion: number = readLineSync.keyInSelect(
      this.listaOpciones,
      "Elija una Opcion"
    );
    switch (opcion) {
      case 0:
        const listaOpcionesAlumno: string[] = [
          "\u001B[3;36m"+ "Dar de Alta Alumno" +"\u001B[0m",
          "\u001B[3;36m"+ "Datos Alumno" +"\u001B[0m",
          "\u001B[3;36m"+ "Dar de Baja Alumno" +"\u001B[0m",
          "\u001B[3;36m"+ "Modificar Datos" +"\u001B[0m",
          "\u001B[3;36m"+ "Alistarse a Materia" +"\u001B[0m",
        ];
        let opcionAlumno: number = readLineSync.keyInSelect(
          listaOpcionesAlumno,
          "\u001B[33m"+ "Elija una Opcion" +"\u001B[0m"
        );
        const opcionElejidaAl: string = listaOpcionesAlumno[opcionAlumno];
        switch (opcionElejidaAl) {
          case "\u001B[3;36m"+ "Dar de Alta Alumno" +"\u001B[0m":
            AltaAlumno();
            break;
          case "\u001B[3;36m"+ "Datos Alumno" +"\u001B[0m":
            DatosIntegrante("Alumno");
            break;
          case "\u001B[3;36m"+ "Dar de Baja Alumno" +"\u001B[0m":
            BajaAlumno();
            break;
          case "\u001B[3;36m"+ "Modificar Datos" +"\u001B[0m":
            ModificarDatos("Alumno");
            break;
          case "\u001B[3;36m"+ "Alistarse a Materia" +"\u001B[0m":
            AlistarMateria();
            break;
        }
        this.Entrar();
        break;
      case 1:
        const listaOpcionesProfesor: string[] = [
          "\u001B[3;34m"+ "Dar de Alta Profesor" +"\u001B[0m",
          "\u001B[3;34m"+ "Datos Profesor" +"\u001B[0m",
          "\u001B[3;34m"+ "Modificar Datos" +"\u001B[0m",
          "\u001B[3;34m"+ "Dar de Baja Profesor" +"\u001B[0m",
          "\u001B[3;34m"+ "Asignar Nota" +"\u001B[0m",
          "\u001B[3;34m"+ "Tomar Materia" +"\u001B[0m",
        ];
        let opcionPofesor: number = readLineSync.keyInSelect(
          listaOpcionesProfesor,
          "\u001B[3,33m"+ "Elija una Opcion" +"\u001B[0m"
        );
        const opcionElejidaPr: string = listaOpcionesProfesor[opcionPofesor];
        console.log(opcionElejidaPr)
        switch (opcionElejidaPr) {
          case "\u001B[3;34m"+ "Dar de Alta Profesor" +"\u001B[0m":
            AltaProfesor();
            break;
          case "\u001B[3;34m"+ "Datos Profesor" +"\u001B[0m":
            DatosIntegrante("Profesor");
            break;
          case "\u001B[3;34m"+ "Modificar Datos" +"\u001B[0m":
            ModificarDatos("Profesor");
            break;
          case "\u001B[3;34m"+ "Dar de Baja Profesor" +"\u001B[0m":
            BajaProfesor();
            break;
          case "\u001B[3;34m"+ "Asignar Nota" +"\u001B[0m":
            PonerNota();
            break;
          case "\u001B[3;34m"+ "Tomar Materia" +"\u001B[0m":
            TomarMateria();
            break;
        }
        this.Entrar();
        break;
      case 2:
        const listaOpcionesMateria = [
           "\u001B[3;31m"+ "Crear Materia" +"\u001B[0m",
           "\u001B[3;31m"+ "Eliminar Materia" +"\u001B[0m"
          ];
        const opcionElejida: number = readLineSync.keyInSelect(
          listaOpcionesMateria,
          "\u001B[33m"+ "Elija una Opcion" +"\u001B[0m"
        );
        switch (listaOpcionesMateria[opcionElejida]) {
          case "\u001B[3;31m"+ "Crear Materia" +"\u001B[0m":
            AltaMateria();
            break;
          case "\u001B[3;31m"+ "Eliminar Materia" +"\u001B[0m":
            EliminarMateria();
            break;
        }
        this.Entrar();
        break;
      case 3:
        const listaOpcionesListados = [
         "\u001B[3;35m"+ "Listado Profesores" +"\u001B[0m",
         "\u001B[3;35m"+ "Listado Alumnos" +"\u001B[0m",
         "\u001B[3;35m"+ "Listado Materias" +"\u001B[0m",
         "\u001B[3;35m"+ "Listado Alumnos X Profesor" +"\u001B[0m",
         "\u001B[3;35m"+ "Listado Profesores X Alumno" +"\u001B[0m",
         "\u001B[3;35m"+ "Listado Alumnos Con Promedio" +"\u001B[0m",
        ];
        const opcionElejidaListados = readLineSync.keyInSelect(
          listaOpcionesListados,
          "\u001B[33m"+ "Seleccione Listado" +"\u001B[0m"
        );
        switch (listaOpcionesListados[opcionElejidaListados]) {
          case "\u001B[3;35m"+ "Listado Profesores" +"\u001B[0m":
            ListaNombreProfesores();
            break;
          case "\u001B[3;35m"+ "Listado Alumnos" +"\u001B[0m":
            ListaNombreAlumnos();
            break;
          case "\u001B[3;35m"+ "Listado Materias" +"\u001B[0m":
            console.table(ListaNombreMaterias().sort())
            break;
          case "\u001B[3;35m"+ "Listado Alumnos X Profesor" +"\u001B[0m":
            ListaAlumnosXProfesor();
            break;
          case  "\u001B[3;35m"+ "Listado Profesores X Alumno" +"\u001B[0m":
            ListaProfesoresXAlummno();
            break;
          case "\u001B[3;35m"+ "Listado Alumnos Con Promedio" +"\u001B[0m" :
            ListadoAlumnosPromedioTablaOrdenada();
            break;
        }
        this.Entrar();
        break;
    }
  }
}
