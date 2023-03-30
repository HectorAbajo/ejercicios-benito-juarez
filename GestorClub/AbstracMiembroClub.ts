import { Persona } from "./InterfacePersona";

export abstract class MiembroClub implements Persona {
    
    nombre: string;
    apellido: string;
    fechaDeNacimiento: string;
    documento: number;
    telefono: number;
    miembroDesde: string;
    
    constructor(nombre: string, apellido: string, fechaDeNacimiento: string, documento: number, telefono: number){

        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.documento = documento;
        this.telefono = telefono;
        this.miembroDesde = new Date().toLocaleDateString()
    }
}