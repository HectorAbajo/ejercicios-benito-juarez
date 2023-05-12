import { MiembroClub } from "./AbstracMiembroClub";
import { Deporte } from "./EnumDeportes";

export class Jugador extends MiembroClub{

    deporte: Deporte;

    constructor(nombre: string, apellido: string, fechaDeNacimiento: string, documento: number,
        telefono: number, deporte: Deporte){
        super(nombre, apellido, fechaDeNacimiento, documento, telefono)
        this.deporte = deporte
    }
}