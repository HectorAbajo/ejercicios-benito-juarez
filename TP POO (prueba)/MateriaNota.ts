import { Materia } from "./Materia";

export class MateriaNota{
    nombre: Materia;
    nota: number;

    public constructor(nombre:Materia, nota:number){
        this.nombre = nombre;
        this.nota = nota
    }
}