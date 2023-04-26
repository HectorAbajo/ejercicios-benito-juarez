import { Integrante } from './Itegrante';
import { Alumno } from './Alumno';
import { v4 as uuidv4 } from 'uuid';
const {BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores} = require ('./funciones.ts');

export class Profesor extends Integrante{
    public materiaDictada: string;
    public alumnos: [];

public constructor(nombre: string, apellido: string, dni: number, contacto: any, materiaDictada: string){
    super(nombre, apellido, dni, contacto)
    this.materiaDictada = materiaDictada
    this.alumnos = []
}
}
