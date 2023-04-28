import { v4 as uuidv4 } from 'uuid';
import { Profesor } from './Profesor';

export class Materia{
    public nombre: string;

    public constructor(nombre: string){
        this.nombre = nombre;
    }
}