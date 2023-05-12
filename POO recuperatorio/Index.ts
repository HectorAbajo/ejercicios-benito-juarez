import { Administracion } from './Administracion';

const readLineSync = require('readline-sync');
const fs = require('fs');
const {BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores} = require ('./funciones.ts');


const AdmEscuela1 = new Administracion()
AdmEscuela1.Entrar()
