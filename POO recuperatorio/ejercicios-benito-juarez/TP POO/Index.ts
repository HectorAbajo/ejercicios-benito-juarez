import { Alumno } from './Alumno';
import { Profesor } from'./Profesor';
import { Materia } from './Materia';
import { Administracion } from './Administracion';
import { v4 as uuidv4 } from 'uuid';
const readLineSync = require('readline-sync');
const fs = require('fs');
const {BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores} = require ('./funciones.ts');


const AdmEscuela1 = new Administracion()
AdmEscuela1.Entrar()
