export class Integrante {

    public nombre: string;
    public apellido: string;
    public dni: number;
    public contacto: any;

    public constructor(nombre: string, apellido: string, dni: number, contacto: any) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.contacto = contacto;
    }
}