import { Motor } from "./Motor";
import { Combustible } from "./EnumCombustible";
import {efiEnerg} from './EnumEficiencia';

class MotorCombustible extends Motor{

    idMCombustible : string;
    cilindros : number;
    tipoCombustible : Combustible|any;

    constructor(idEquipo: string, descripcion: string, fechaF: Date, fechaI: Date, idMotor: string, potenciaHp: number, eficiencia: efiEnerg, fabricante: string, idMCombustible: string, numCilindros: number, combustible: Combustible, ){
        super(idEquipo, descripcion, fechaF, fechaI,idMotor, potenciaHp, eficiencia, fabricante, )
        this.idMCombustible = idMCombustible;
        this.cilindros = numCilindros;
        this.tipoCombustible = combustible;
    }

    private modificadorEfiEnerg2(motorCombustEditar: MotorCombustible): any{
        const arrayEf : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
        motorCombustEditar.eficiencia = arrayEf[motorCombustEditar.eficiencia]
        // console.log(motorCombustEditar.eficiencia)
        return motorCombustEditar.eficiencia
    }

    private modificadorCombustible(motorCombustEditar: MotorCombustible): any{
        const arrayEf : string[] = ["GasOil", "Nafta", "Gnc"];
        motorCombustEditar.tipoCombustible = arrayEf[motorCombustEditar.tipoCombustible]
        // console.log(motorCombustEditar.tipoCombustible)
        return motorCombustEditar.tipoCombustible
    }

    private modificadorMotorCombustible (motorCombustEditar: MotorCombustible, datoModificar: any, valorAsignar : any){

        const arrKey: (string | Date)[] = Object.keys(motorCombustEditar)
        const data: number = arrKey.indexOf(datoModificar)
        // console.log(arrKey)
        // console.log(data)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {motorCombustEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;

            case 1 :
                if(typeof(valorAsignar) == "string")
                {motorCombustEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                {motorCombustEditar.fechaFabricacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                {motorCombustEditar.fechaInstalacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 4 :
                if(typeof(valorAsignar) == "string")
                {motorCombustEditar.idMotor = valorAsignar}
                else{console.log("invalido")}
                break;

            case 5 :
                if(typeof(valorAsignar) == "number")
                {motorCombustEditar.potenciaHp = valorAsignar}
                else{console.log("invalido")}
                break;

            case 6 :
                const arrayEf1 : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
                motorCombustEditar.eficiencia = arrayEf1[valorAsignar]
                break;

            case 7 :
                if(typeof(valorAsignar) == "string")
                {motorCombustEditar.fabricante = valorAsignar}
                else{console.log("invalido")}
                break;

            case 8 :
                if(typeof(valorAsignar) == "string")
                {motorCombustEditar.idMCombustible = valorAsignar}
                else{console.log("invalido")}
                break;

            case 9:
                if(typeof(valorAsignar) == "number")
                {motorCombustEditar.cilindros = valorAsignar}
                else{console.log("invalido")}
                break;

            case 10 :
                const arrayCombust: string[] = ["GasOil", "Nafta", "Gnc"]
                motorCombustEditar.tipoCombustible = arrayCombust[valorAsignar]
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const motorCombustEditado = motorCombustEditar;
        return motorCombustEditado
    }

    private comprovacionMotorCombustible(array: MotorCombustible [], nuevoMotorCombust: MotorCombustible): number{

        if(array.indexOf(nuevoMotorCombust) === -1){
        return -1
    }
        else{
            const indexMotorCombust = array.indexOf(nuevoMotorCombust)
            return indexMotorCombust
        }
    }

    agregar(array: MotorCombustible [], nuevoMotorCombust : MotorCombustible){

        if(this.comprovacionMotorCombustible(array, nuevoMotorCombust) === -1){
            array.push(nuevoMotorCombust)
            nuevoMotorCombust.modificadorEfiEnerg2(nuevoMotorCombust)
            nuevoMotorCombust.modificadorCombustible(nuevoMotorCombust)
            return array
        }
        if(this.comprovacionMotorCombustible(array,nuevoMotorCombust) >= 0){
            console.log("motor ya existente")
        }
        else{
            console.log("motor invalido")
        }
    }

    leer(motorCombust: MotorCombustible): MotorCombustible{

        const motorCombustALeer : MotorCombustible = motorCombust
        console.log(motorCombustALeer)
        return motorCombustALeer
    }

    editar(array: MotorCombustible[], motorCombust: MotorCombustible, datoModificar : string, valorAsignar: any ): MotorCombustible{

        if(this.comprovacionMotorCombustible(array, motorCombust) >= 0){
            const indexEditar: number = this.comprovacionMotorCombustible(array,motorCombust)
            // console.log(indexEditar)
            let motorCombustEditar : MotorCombustible = array[indexEditar]
            // console.log(motorCombustEditar)
            motorCombustEditar.modificadorMotorCombustible(motorCombustEditar,datoModificar,valorAsignar)
            const motorCombustEditado : MotorCombustible = motorCombustEditar.modificadorMotorCombustible(motorCombustEditar,datoModificar,valorAsignar)
            motorCombust = motorCombustEditado
            // console.log(motorCombustEditado)
        }
        return motorCombust
    }

    eliminar(array: MotorCombustible[], motorCombustElimin : any){

        if(this.comprovacionMotorCombustible(array, motorCombustElimin) >= 0){
            array.splice(motorCombustElimin,1)
        }
    }
}

const listaMotorCombust : MotorCombustible[] = [];
const fechaF1 : Date = new Date (1992,5,8);
const fechaI1 : Date = new Date (2005,10,9);
const fechaF2 : Date = new Date (1998,3,5);
const fechaI2 : Date = new Date (1999,8,30);
const motorCombust1 : MotorCombustible = new MotorCombustible("equipo1","para caldera",fechaF1,fechaI1,"motor1",2,efiEnerg.B,"indiel","motorcombustible2",2,Combustible.Gnc)
const motorCombust2 : MotorCombustible = new MotorCombustible("equipo2","para extraccion",fechaF2,fechaI2,"motor2",5,efiEnerg.A,"vulcano","motorcombustible1",3,Combustible.GasOil)
motorCombust2.agregar(listaMotorCombust,motorCombust2)
motorCombust1.agregar(listaMotorCombust,motorCombust1)
// console.log(listaMotorCombust)
motorCombust1.editar(listaMotorCombust,motorCombust1,"tipoCombustible",Combustible.Nafta)
console.log(listaMotorCombust)