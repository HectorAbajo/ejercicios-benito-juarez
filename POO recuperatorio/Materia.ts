import { v4 as uuidv4 } from 'uuid';

export class Materia{
    public nombre: string ;
    public nota: number ;

    public constructor(nombre: string){
        this.nombre = nombre ;
        this.nota = 0 ;
    }
}