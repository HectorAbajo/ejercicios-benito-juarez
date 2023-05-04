import { Alumno } from './Alumno';
import { Integrante } from './Itegrante';
import { Profesor } from './Profesor';
import { Materia } from './Materia';
import { MateriaNota } from './MateriaNota';

const readLineSync = require('readline-sync');
const fs = require('fs');

const {ListaNombreMaterias, ListaProfesoresXAlummno, ListadoAlumnosXProfesor, AlistarseMateria, ListaNombreAlumnos, ListaNombreProfesores, BuscarMateria, EliminarMateria, CrearMateria, BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores } = require("./funciones.ts");

