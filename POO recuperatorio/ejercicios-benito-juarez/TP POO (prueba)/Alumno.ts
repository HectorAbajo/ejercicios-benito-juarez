import { Integrante } from './Itegrante';
import { Materia } from './Materia';
import { v4 as uuidv4 } from 'uuid';
import { MateriaNota } from './MateriaNota';


export class Alumno extends Integrante{
    public idAlumno: string = uuidv4();
    public materias: Materia [];
    public promedio: number;
    public profesores: string [];
    public materiaNota: MateriaNota[]; 

    public constructor(nombre: string, apellido: string, dni: number, contacto: any){
        super(nombre, apellido, dni, contacto)
        this.materias = [];
        this.promedio = 0;
        this.profesores = [];
        this.materiaNota = [];
    }

}

