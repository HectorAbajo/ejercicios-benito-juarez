import fs from 'fs';
import readLineSync from 'readline-sync';

import { Jugador } from './Jugador';
import { Deporte } from './EnumDeportes';

export class GestorClub {

    constructor(){
        fs.writeFileSync('./socios.json','[]')
    }

    leer(){return fs.readFileSync('./socios.json')}
    dato(){return JSON.parse( fs.readFileSync('./socios.json'))}

    agregarSocio(){

        const nombre = readLineSync.question("Ingrese Nombre");
        const apellido = readLineSync.question("Ingrese Apellido");
        const fechaDeNacimiento = readLineSync.question("Ingrese Fecha de Nacimiento");
        const documento = Number(readLineSync.question("Ingrese Documento"));
        const telefono = Number(readLineSync.question("Ingrese Telefono"));

        const arrayDeportes: string[] = ["futbol", "basket", "zumba", "voley", "natacion", "gym"];
        const deporte: Deporte = readLineSync.keyInSelect(arrayDeportes, "Seleccione Deporte");

        let nuevoJugador: Jugador = new Jugador(nombre, apellido, fechaDeNacimiento, documento, telefono, deporte);
        const jugadores: Jugador[] = [...this.dato(), nuevoJugador];
        fs.writeFileSync('./socios.json', JSON.stringify(jugadores,null,2))
    }

    filtroNombre(nombre: string){
        const jugadorNombre: Jugador = this.dato().find((jugadores: Jugador)=>jugadores.nombre === nombre)
        return jugadorNombre
    }

    filtroApellido(apellido: string){
        const jugadorApellido: Jugador = this.dato().find((jugadores: Jugador)=>jugadores.apellido === apellido)
        return jugadorApellido
    }

    filtroFechaDeNacimiento(fechaDeNacimiento: string){
        const jugadorFechaDeNacimiento: Jugador = this.dato().find((jugadores: Jugador)=>jugadores.fechaDeNacimiento === fechaDeNacimiento)
        return jugadorFechaDeNacimiento
    }

    filtroDocumento(documento: number){
        const jugadorDocumento: Jugador = this.dato().find((jugadores: Jugador)=>jugadores.documento === documento)
        return jugadorDocumento
    }

    filtroTelefono(telefono: number){
        const jugadorTelefono: Jugador = this.dato().find((jugadores: Jugador)=>jugadores.telefono === telefono)
        return jugadorTelefono
    }

}
