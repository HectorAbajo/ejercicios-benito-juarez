import { Equipo } from "./Equipo";

class Bomba extends Equipo{

    idBomba : string;
    caudalEntrada : number;
    caudalSalida : number;
    fabricanteBomba : string;

    constructor(idEquipo: string, descripcion: string, fechaF: Date,fechaI: Date, idBomba: string, caudalEntrada: number, caudalSalida: number, fabricanteBomba: string){
        super(idEquipo, descripcion, fechaF, fechaI)
        this.idBomba = idBomba;
        this.caudalEntrada = caudalEntrada;
        this.caudalSalida = caudalSalida;
        this.fabricanteBomba = fabricanteBomba;
    }

    private modificadorBomba (bombaEditar: Bomba, datoModificar: any, valorAsignar : any){

        const arrKey: (any)[] = Object.keys(bombaEditar)
        const data: number = arrKey.indexOf(datoModificar)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {bombaEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;

            case 1 :
                if(typeof(valorAsignar) == "string")
                {bombaEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                {bombaEditar.fechaFabricacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                {bombaEditar.fechaInstalacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 4 :
                if(typeof(valorAsignar) == "string")
                {bombaEditar.idBomba = valorAsignar}
                else{console.log("invalido")}
                break;

            case 5 :
                if(typeof(valorAsignar) == "number")
                {bombaEditar.caudalEntrada = valorAsignar}
                else{console.log("invalido")}
                break;

            case 6 :
                if(typeof(valorAsignar) == "number")
                {bombaEditar.caudalSalida = valorAsignar}
                else{console.log("invalido")}
                break;

            case 7 :
                if(typeof(valorAsignar) == "string")
                {bombaEditar.fabricanteBomba = valorAsignar}
                else{console.log("invalido")}
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const bombaEditada = bombaEditar;
        return bombaEditada
    }

    private comprovacionBomba(array: Bomba [], nuevaBomba: Bomba): number{

        if(array.indexOf(nuevaBomba) === -1){
        return -1
    }
        else{
            const indexBomba = array.indexOf(nuevaBomba)
            return indexBomba
        }
    }

    agregar(array: Bomba [], nuevaBomba : Bomba){

        if(this.comprovacionBomba(array, nuevaBomba) === -1){
            array.push(nuevaBomba)
            return array
        }
        if(this.comprovacionBomba(array,nuevaBomba) >= 0){
            console.log("bomba ya existente")
        }
        else{
            console.log("bomba invalido")
        }
    }

    leer(bomba: Bomba): Bomba{

        const bombaALeer : Bomba = bomba
        console.log(bombaALeer)
        return bombaALeer
    }

    editar(array: Bomba[], bomba: Bomba, datoModificar : string, valorAsignar: any ): Bomba{

        if(this.comprovacionBomba(array, bomba) >= 0){
            const indexEditar: number = this.comprovacionBomba(array,bomba)
            // console.log(indexEditar)
            let bombaEditar : Bomba = array[indexEditar]
            // console.log(bombaEditar)
            bombaEditar.modificadorBomba(bombaEditar,datoModificar,valorAsignar)
            const bombaEditada : Bomba = bombaEditar.modificadorBomba(bombaEditar,datoModificar,valorAsignar)
            bomba = bombaEditada
            console.log(bombaEditada)
        }
        return bomba
    }

    eliminar(array: Bomba[], bombaElimin : any){

        if(this.comprovacionBomba(array, bombaElimin) >= 0){
            array.splice(bombaElimin,1)
        }
    }

}

const listaBomba : Bomba[] = [];
const fechaF1 : Date = new Date (1992,5,8);
const fechaI1 : Date = new Date (2005,10,9);
const fechaF2 : Date = new Date (1998,3,5);
const fechaI2 : Date = new Date (1999,8,30);
const bomba1 : Bomba = new Bomba("equipo1","para caldera",fechaF1,fechaI1,"bomba1",2000,1500,"vulvano")
const bomba2 : Bomba = new Bomba("equipo2","para extraccion",fechaF2,fechaI2,"bomba2",4000,3000,"Grundfos")
bomba2.agregar(listaBomba,bomba2)
bomba1.agregar(listaBomba,bomba1)
// console.log(listaBomba)
bomba1.editar(listaBomba,bomba1,"caudalEntrada","5000")
console.log(listaBomba)