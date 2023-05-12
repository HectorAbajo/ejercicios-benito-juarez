import { Integrante } from './Itegrante';
import { Materia } from './Materia';
import { v4 as uuidv4 } from 'uuid';

export class Alumno extends Integrante{
    public contacto: any;
    public idAlumno: string = uuidv4();
    public materias: Materia [];
    public promedio: number;
    public profesores: string [];

    public constructor(nombre: string, apellido: string, dni: number, contacto: any){
        super(nombre, apellido, dni);
        this.contacto = contacto;
        this.materias = [];
        this.promedio = 0;
        this.profesores = [];
    }

}

