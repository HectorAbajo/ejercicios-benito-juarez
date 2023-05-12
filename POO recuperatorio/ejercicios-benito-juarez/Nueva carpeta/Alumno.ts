import { Integrante } from './Itegrante';
import { Materia } from './Materia';
import { Profesor } from './Profesor';
import { Administracion } from './Administracion';
import { v4 as uuidv4 } from 'uuid';
const {BuscarIntegrante, ModificarDatos, AltaIntegrante, BajaIntegrante, ListadoAlumnos, ListadoProfesores} = require ('./funciones.ts');

export class Alumno extends Integrante{
    public materias:Materia [];
    public promedio: number;
    public profesores: string [];

    public constructor(nombre: string, apellido: string, dni: number, contacto: any){
        super(nombre, apellido, dni, contacto)
        this.materias = [];
        this.promedio = 0;
        this.profesores = []
    }

}

