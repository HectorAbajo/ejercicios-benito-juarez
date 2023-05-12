import { Alumno } from "./Alumno";
import { Profesor } from "./Profesor";
import { Materia } from "./Materia";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "https";
import { MateriaNota } from "./MateriaNota";

const readLineSync = require("readline-sync");
const fs = require("fs");
const {
    MateriasDisponibles,
    ListaNombreMaterias,
    ListadoAlumnosXProfesor,
    AlistarseMateria,
    ListaNombreAlumnos,
    ListaNombreProfesores,
    BuscarMateria,
    EliminarMateria,
    CrearMateria,
    BuscarIntegrante,
    ModificarDatos,
    AltaIntegrante,
    BajaIntegrante,
    ListadoAlumnos,
    ListadoProfesores,
    ListaProfesoresXAlummno,
} = require("./funciones.ts");

export class Administracion {
    private listaOpciones: string[];

    public constructor() {
        this.listaOpciones = [
            "Alumno/s",
            "Profesor/es",
            "Materia/s",
            "Listados",
            "Alistarse A Materia",
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
                    "Dar de Alta Alumno",
                    "Datos Alumno",
                    "Dar de Baja Alumno",
                    "Modificar Datos",
                    "Alistarse a Materia",
                ];
                let opcionAlumno: number = readLineSync.keyInSelect(
                    listaOpcionesAlumno,
                    "Elija una Opcion"
                );
                const opcionElejidaAl: string = listaOpcionesAlumno[opcionAlumno];
                switch (opcionElejidaAl) {
                    case "Dar de Alta Alumno":
                        AltaIntegrante("alumno");
                        break;
                    case "Datos Alumno":
                        const nombre: string = readLineSync.question("Nombre ");
                        const apellido: string = readLineSync.question("Apellido ");
                        const dni: string = readLineSync.question("Dni ");
                        let integranteDatos = BuscarIntegrante(
                            ListadoAlumnos(),
                            nombre,
                            apellido,
                            dni
                        );
                        if (integranteDatos.length === 1) {
                            const opcionesModificar = ["Modificar Datos"];
                            const opcinElejidaMod =
                                readLineSync.keyInSelect(opcionesModificar);
                            if (opcionesModificar[opcinElejidaMod] === "Modificar Datos") {
                                ModificarDatos(
                                    "alumno",
                                    ListadoAlumnos(),
                                    nombre,
                                    apellido,
                                    dni
                                );
                            }
                        }
                        break;
                    case "Dar de Baja Alumno":
                        const nombre1: string = readLineSync.question("Nombre ");
                        const apellido1: string = readLineSync.question("Apellido ");
                        const dni1: string = readLineSync.question("Dni ");
                        BajaIntegrante(
                            "./src/Alumnos.Json",
                            ListadoAlumnos(),
                            nombre1,
                            apellido1,
                            dni1
                        );
                        break;
                }
                const AdmEscuela15 = new Administracion();
                AdmEscuela15.Entrar();
                break;
            case 1:
                const listaOpcionesProfesor: string[] = [
                    "Dar de Alta Profesor",
                    "Datos Profesor",
                    "Dar de Baja Profesor",
                ];
                let opcionPofesor: number = readLineSync.keyInSelect(
                    listaOpcionesProfesor,
                    "Elija una Opcion"
                );
                const opcionElejidaPr: string = listaOpcionesProfesor[opcionPofesor];
                switch (opcionElejidaPr) {
                    case "Dar de Alta Profesor":
                        AltaIntegrante("Profesor");
                        break;
                    case "Datos Profesor":
                        const nombre: string = readLineSync.question("Nombre ");
                        const apellido: string = readLineSync.question("Apellido ");
                        const dni: string = readLineSync.question("Dni ");
                        let integranteDatos = BuscarIntegrante(
                            ListadoProfesores(),
                            nombre,
                            apellido,
                            dni
                        );
                        if (integranteDatos.length === 1) {
                            const opcionesModificar = ["Modificar Datos"];
                            const opcinElejidaMod =
                                readLineSync.keyInSelect(opcionesModificar);
                            if (opcionesModificar[opcinElejidaMod] === "Modificar Datos") {
                                ModificarDatos(
                                    "profesor",
                                    ListadoProfesores(),
                                    nombre,
                                    apellido,
                                    dni
                                );
                            }
                        }
                        break;
                    case "Dar de Baja Profesor":
                        const nombre1: string = readLineSync.question("Nombre ");
                        const apellido1: string = readLineSync.question("Apellido ");
                        const dni1: string = readLineSync.question("Dni ");
                        BajaIntegrante(
                            "./src/Profesores.Json",
                            ListadoProfesores(),
                            nombre1,
                            apellido1,
                            dni1
                        );
                        break;
                }
                const AdmEscuela11 = new Administracion();
                AdmEscuela11.Entrar();
                break;
            case 2:
                const listaOpcionesMateria = ["Crear Materia", "Eliminar Materia"];
                const opcionElejida: number = readLineSync.keyInSelect(
                    listaOpcionesMateria,
                    "Elija una Opcion"
                );
                switch (listaOpcionesMateria[opcionElejida]) {
                    case "Crear Materia":
                        CrearMateria();
                        break;
                    case "Eliminar Materia":
                        EliminarMateria();
                        break;
                }
                const AdmEscuela12 = new Administracion();
                AdmEscuela12.Entrar();
                break;
            case 3:
                const listaOpcionesListados = [
                    "Listado Profesores",
                    "Listado Alumnos",
                    "Listado Alumnos X Profesor",
                    "Listado Profesores X Alumno",
                    "Listado Alumnos Con Promedio",
                ];
                const opcionElejidaListados = readLineSync.keyInSelect(
                    listaOpcionesListados,
                    "Seleccione Listado"
                );
                switch (listaOpcionesListados[opcionElejidaListados]) {
                    case "Listado Profesores":
                        console.log(ListaNombreProfesores());
                        break;
                    case "Listado Alumnos":
                        console.log(ListaNombreAlumnos());
                        break;
                    case "Listado Alumnos X Profesor":
                        console.log(ListadoAlumnosXProfesor());
                        break;
                    case "Listado Profesores X Alumno":
                        console.log(ListaProfesoresXAlummno());
                        break;
                    case "Listado Alumnos Con Promedio":
                        break;
                }
                const AdmEscuela13 = new Administracion();
                AdmEscuela13.Entrar();
                break;
            case 4:
                AlistarseMateria();

                const AdmEscuela14 = new Administracion();
                AdmEscuela14.Entrar();
                break;
        }
    }
}
