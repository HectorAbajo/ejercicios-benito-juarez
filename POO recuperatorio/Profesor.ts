import { Integrante } from './Itegrante';
import { v4 as uuidv4 } from 'uuid';

export class Profesor extends Integrante{
    public contacto: any;
    public idProfesor: string = uuidv4();
    public materiaDictada: string;
    public alumnos:string [];

public constructor(nombre: string, apellido: string, dni: number, contacto: any, materiaDictada?: string){
    super(nombre, apellido, dni);
    this.contacto = contacto;
    this.materiaDictada = "";
    this.alumnos = [];
}
}
