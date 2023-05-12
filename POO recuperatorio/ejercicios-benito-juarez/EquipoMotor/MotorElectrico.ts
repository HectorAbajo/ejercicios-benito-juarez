import {Motor} from './Motor'
import {efiEnerg} from './EnumEficiencia';

class MotorElectrico extends Motor{

    idMElectrico : string;
    voltaje : number;
    consumoKwH : number;
    isBajoConsumo : boolean|string;

    constructor(idEquipo: string, descripcion: string, fechaF: Date, fechaI: Date, idMotor: string, potenciaHp: number, eficiencia: efiEnerg, fabricante: string, idMElectrico: string, voltaje: number, consumo: number, isBajoConsumo: boolean ){
        super(idEquipo, descripcion, fechaF, fechaI, idMotor, potenciaHp, eficiencia, fabricante, )
        this.idMElectrico = idMElectrico;
        this.voltaje = voltaje;
        this.consumoKwH = consumo;
        this.isBajoConsumo = isBajoConsumo;
    }

    private modificadorEfiEnerg2(motorElectrEditar: MotorElectrico): any{
        const arrayEf : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
        motorElectrEditar.eficiencia = arrayEf[motorElectrEditar.eficiencia]
        // console.log(motorElectrEditar.eficiencia)
        return motorElectrEditar.eficiencia
    }

    private modificadorBajoConsumo(motorElectrEditar: MotorElectrico): any{
        if(motorElectrEditar.isBajoConsumo = false){
            motorElectrEditar.isBajoConsumo = "No"
        } else{
            motorElectrEditar.isBajoConsumo = "Si"
        }
            // console.log(motorEditar.eficiencia))
        
        return motorElectrEditar.eficiencia
    }


    private modificadorMotorElectr(motorElectrEditar: MotorElectrico, datoModificar: any, valorAsignar : any){

        const arrKey: (string | Date)[] = Object.keys(motorElectrEditar)
        const data: number = arrKey.indexOf(datoModificar)
        // console.log(arrKey)
        // console.log(data)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {motorElectrEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;

            case 1 :
                if(typeof(valorAsignar) == "string")
                {motorElectrEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                {motorElectrEditar.fechaFabricacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                {motorElectrEditar.fechaInstalacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 4 :
                if(typeof(valorAsignar) == "string")
                {motorElectrEditar.idMotor = valorAsignar}
                else{console.log("invalido")}
                break;

            case 5 :
                if(typeof(valorAsignar) == "number")
                {motorElectrEditar.potenciaHp = valorAsignar}
                else{console.log("invalido")}
                break;

            case 6 :
                const arrayEf1 : string[] = ["A", "AA", "AAA", "B", "C", "D", "E", "F"];
                motorElectrEditar.eficiencia = arrayEf1[valorAsignar]
                break;

            case 7 :
                if(typeof(valorAsignar) == "string")
                {motorElectrEditar.fabricante = valorAsignar}
                else{console.log("invalido")}
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const motorElectrEditado = motorElectrEditar;
        return motorElectrEditado
    }

    private comprovacionMotorElectr(array: MotorElectrico [], nuevoElectrMotor: MotorElectrico): number{
        
        if(array.indexOf(nuevoElectrMotor) === -1){
        return -1
    }
        else{
            const indexMotorElectr = array.indexOf(nuevoElectrMotor)
            return indexMotorElectr
        }
    }

    agregar(array: MotorElectrico [], nuevoElectrMotor : MotorElectrico){
        
        if(this.comprovacionMotorElectr(array, nuevoElectrMotor) === -1){
            array.push(nuevoElectrMotor)
            nuevoElectrMotor.modificadorBajoConsumo(nuevoElectrMotor)
            nuevoElectrMotor.modificadorEfiEnerg2(nuevoElectrMotor)
            return array
        }
        if(this.comprovacionMotorElectr(array,nuevoElectrMotor) >= 0){
            console.log("motor ya existente")
        }
        else{
            console.log("motor invalido")
        }
    }

    leer(motorElectr: MotorElectrico): MotorElectrico{

        const motorElectrALeer : MotorElectrico = motorElectr
        console.log(motorElectrALeer)
        return motorElectrALeer
    }

    editar(array: MotorElectrico[], motorElectr: MotorElectrico, datoModificar : string, valorAsignar: any ): MotorElectrico{

        if(this.comprovacionMotorElectr(array, motorElectr) >= 0){
            const indexEditar: number = this.comprovacionMotorElectr(array,motorElectr)
            // console.log(indexEditar)
            let motorElectrEditar : MotorElectrico = array[indexEditar]
            // console.log(motorElectrEditar)
            motorElectrEditar.modificadorMotorElectr(motorElectrEditar,datoModificar,valorAsignar)
            const motorElectrEditado : MotorElectrico = motorElectrEditar.modificadorMotorElectr(motorElectrEditar,datoModificar,valorAsignar)
            motorElectr = motorElectrEditado
            // console.log(motorElectrEditado)
        }
        return motorElectr
    }

    eliminar(array: MotorElectrico[], motorElectrElimin : any){

        if(this.comprovacionMotorElectr(array, motorElectrElimin) >= 0){
            array.splice(motorElectrElimin,1)   
        }
    }
}

const listaMotorElectrico : MotorElectrico[] = []
const fechaF1 : Date = new Date (1992,5,8);
const fechaI1 : Date = new Date (2005,10,9);
const fechaF2 : Date = new Date (1998,3,5);
const fechaI2 : Date = new Date (1999,8,30);
const motorElectric1 : MotorElectrico = new MotorElectrico("equipo1","para caldera",fechaF1,fechaI1,"motor1",2,efiEnerg.B,"indiel","motorElectrico1",220,3.5,true)
const motorElectric2 : MotorElectrico = new MotorElectrico("equipo2","para extraccion",fechaF2,fechaI2,"motor2",5,efiEnerg.A,"vulcano","motorElectrico2",380,5,false)
motorElectric1.agregar(listaMotorElectrico,motorElectric1)
motorElectric2.agregar(listaMotorElectrico,motorElectric2)
// console.log(listaMotor)
motorElectric1.editar(listaMotorElectrico,motorElectric1,"eficiencia",efiEnerg.E)
console.log(listaMotorElectrico)