import { Integrante } from './Itegrante';
import { v4 as uuidv4 } from 'uuid';
import { Materia } from './Materia';


export class Profesor extends Integrante{
    public idProfesor: string = uuidv4();
    public materiaDictada: Materia;
    public alumnos:string [];

public constructor(nombre: string, apellido: string, dni: number, contacto: any, materiaDictada: Materia){
    super(nombre, apellido, dni, contacto)
    
    this.materiaDictada = materiaDictada
    this.alumnos = [];
}
}
