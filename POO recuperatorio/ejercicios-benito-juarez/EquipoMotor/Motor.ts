import { Equipo } from './Equipo';
import {efiEnerg} from './EnumEficiencia';

export class Motor extends Equipo{

    idMotor : string;
    potenciaHp : number;
    eficiencia : efiEnerg|any;
    fabricante : string;

    constructor(idEquipo: string, descripcion: string, fechaF: Date, fechaI: Date, idMotor: string, potenciaHp: number, eficiencia: efiEnerg, fabricante: string){
        super(idEquipo, descripcion, fechaF, fechaI)
        this.idMotor = idMotor;
        this.potenciaHp = potenciaHp;
        this.eficiencia = eficiencia;
        this.fabricante = fabricante;
    }

    private modificadorEfiEnerg(motorEditar: Motor): any{
        const arrayEf : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
        motorEditar.eficiencia = arrayEf[motorEditar.eficiencia]
        // console.log(motorEditar.eficiencia)
        return motorEditar.eficiencia
    }

    private modificadorMotor (motorEditar: Motor, datoModificar: any, valorAsignar : any){

        const arrKey: (string | Date)[] = Object.keys(motorEditar)
        const data: number = arrKey.indexOf(datoModificar)
        // console.log(arrKey)
        // console.log(data)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {motorEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;

            case 1 :
                if(typeof(valorAsignar) == "string")
                {motorEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                {motorEditar.fechaFabricacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                {motorEditar.fechaInstalacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 4 :
                if(typeof(valorAsignar) == "string")
                {motorEditar.idMotor = valorAsignar}
                else{console.log("invalido")}
                break;

            case 5 :
                if(typeof(valorAsignar) == "number")
                {motorEditar.potenciaHp = valorAsignar}
                else{console.log("invalido")}
                break;

            case 6 :
                const arrayEf1 : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
                motorEditar.eficiencia = arrayEf1[valorAsignar]
                break;

            case 7 :
                if(typeof(valorAsignar) == "string")
                {motorEditar.fabricante = valorAsignar}
                else{console.log("invalido")}
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const motorEditado = motorEditar;
        return motorEditado
    }

    private comprovacionMotor(array: Motor [], nuevoMotor: Motor): number{
        
        if(array.indexOf(nuevoMotor) === -1){
        return -1
    }
        else{
            const indexMotor = array.indexOf(nuevoMotor)
            return indexMotor
        }
    }

    agregar(array: Motor [], nuevoMotor : Motor){
        
        if(this.comprovacionMotor(array, nuevoMotor) === -1){
            array.push(nuevoMotor)
            nuevoMotor.modificadorEfiEnerg(nuevoMotor)
            return array
        }
        if(this.comprovacionMotor(array,nuevoMotor) >= 0){
            console.log("motor ya existente")
        }
        else{
            console.log("motor invalido")
        }
    }

    leer(motor: Motor): Motor{

        const motorALeer : Motor = motor
        console.log(motorALeer)
        return motorALeer
    }

    editar(array: Motor[], motor: Motor, datoModificar : string, valorAsignar: any ): Motor{

        if(this.comprovacionMotor(array, motor) >= 0){
            const indexEditar: number = this.comprovacionMotor(array,motor)
            // console.log(indexEditar)
            let motorEditar : Motor = array[indexEditar]
            // console.log(motorEditar)
            motorEditar.modificadorMotor(motorEditar,datoModificar,valorAsignar)
            const motorEditado : Motor = motorEditar.modificadorMotor(motorEditar,datoModificar,valorAsignar)
            motor = motorEditado
            // console.log(motorEditado)
        }
        return motor
    }

    eliminar(array: Motor[], motorElimin : any){

        if(this.comprovacionMotor(array, motorElimin) >= 0){
            array.splice(motorElimin,1)   
        }
    }
}

// const listaMotor : Motor[] = [];
// const fechaF1 : Date = new Date (1992,5,8);
// const fechaI1 : Date = new Date (2005,10,9);
// const fechaF2 : Date = new Date (1998,3,5);
// const fechaI2 : Date = new Date (1999,8,30);
// const motor1 : Motor = new Motor("equipo1","para caldera",fechaF1,fechaI1,"motor1",2,efiEnerg.B,"indiel")
// const motor2 : Motor = new Motor("equipo2","para extraccion",fechaF2,fechaI2,"motor2",5,efiEnerg.A,"vulcano")
// motor2.agregar(listaMotor,motor2)
// motor1.agregar(listaMotor,motor1)
// // console.log(listaMotor)
// motor1.editar(listaMotor,motor1,"eficiencia",efiEnerg.E)
// console.log(listaMotor)
