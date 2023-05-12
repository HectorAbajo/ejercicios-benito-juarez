export class Integrante {

    public nombre: string;
    public apellido: string;
    public dni: number;

    public constructor(nombre: string, apellido: string, dni: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}