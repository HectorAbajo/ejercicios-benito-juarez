import { Equipo } from "./Equipo";
import { Material } from "./EnumRoscaMaterial";

class KitDeMangueras extends Equipo{

    private idBomba : string;
    private elementos : number;
    private medidaPulgadas : number;
    private roscaMaterial : Material|any;

    constructor(idEquipo: string, descripcion: string, fechaF: Date, fechaI: Date, idBomba: string, elementos: number, medidaPulgadas: number, roscaMaterial: Material){
        super(idEquipo, descripcion, fechaF, fechaI);
        this.idBomba = idBomba;
        this.elementos = elementos;
        this.medidaPulgadas = medidaPulgadas;
        this.roscaMaterial = roscaMaterial;
    }

    private modificadorRoscaMaterial(kitEditar: KitDeMangueras): any{
        const arrayM : string[] = ["plastica","metalica","acopleRapido"];
        kitEditar.roscaMaterial = arrayM[kitEditar.roscaMaterial]
        console.log(kitEditar.roscaMaterial)
        return kitEditar.roscaMaterial
    }

    private modificadorKit (kitEditar: KitDeMangueras, datoModificar: any, valorAsignar : any){

        const arrKey: (string | Date)[] = Object.keys(kitEditar)
        const data: number = arrKey.indexOf(datoModificar)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {kitEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;
            
            case 1 :
                if(typeof(valorAsignar) == "string")
                {kitEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                kitEditar.fechaFabricacion = valorAsignar
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                kitEditar.fechaInstalacion = valorAsignar
                else{console.log("invalido")}
                break;

            case 4 :
                if(typeof(valorAsignar) == "string")
                {kitEditar.idBomba = valorAsignar}
                else{console.log("invalido")}
                break;

            case 5 :
                if(typeof(valorAsignar) == "number")
                {kitEditar.elementos = valorAsignar}
                else{console.log("invalido")}
                break;
                
            case 6 :
                if(typeof(valorAsignar) == "number")
                {kitEditar.medidaPulgadas = valorAsignar}
                else{console.log("invalido")}
                break;

            case 7 :
                const arrayRoscaM : string[] = ["plastica", "metalica", "acopleRapido",];
                kitEditar.roscaMaterial = arrayRoscaM[valorAsignar]
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const kitEditado = kitEditar;
        return kitEditado
    }

    private comprovacionKit(array: KitDeMangueras [], nuevoKit: KitDeMangueras): number{
        
        if(array.indexOf(nuevoKit) === -1){
        return -1
    }
        else{
            const indexKit = array.indexOf(nuevoKit)
            return indexKit
        }
    }

    agregarKit(array: KitDeMangueras [], nuevoKit : KitDeMangueras){
        
        if(this.comprovacionKit(array, nuevoKit) === -1){
            array.push(nuevoKit)
            nuevoKit.modificadorRoscaMaterial(nuevoKit)
            return array
        }
        if(this.comprovacionKit(array,nuevoKit) >= 0){
            console.log("equipo ya existente")
        }
        else{
            console.log("equipo invalido")
        }
    }

    leerKit(kit: KitDeMangueras): KitDeMangueras{

        const kitALeer : KitDeMangueras = kit
        console.log(kitALeer)
        return kitALeer
    }

    editarEquipo(array: KitDeMangueras[], kit: KitDeMangueras, datoModificar : string, valorAsignar: string|Date ): Equipo{

        if(this.comprovacionKit(array, kit) >= 0){
            const indexEditar: number = this.comprovacionKit(array,kit)
            // console.log(indexEditar)
            let kitEditar : KitDeMangueras = array[indexEditar]
            // console.log(kitEditar)
            kitEditar.modificadorKit(kitEditar,datoModificar,valorAsignar)
            const kitEditado : KitDeMangueras = kitEditar.modificadorKit(kitEditar,datoModificar,valorAsignar)
            kit = kitEditado
            console.log(kitEditado)
        }
        return kit
    }

    eliminarEquipo(array: KitDeMangueras[], kitElimin : any){

        if(this.comprovacionKit(array, kitElimin) >= 0){
            array.splice(kitElimin,1)   
        }
    }
}

// const listaKit: KitDeMangueras[] = [];
// const fechaFEquipo1 : Date = new Date(1998,11,22)
// const fechaIEquio1 : Date = new Date(2020,5,2)
// const fechaFEquipo2 : Date = new Date(1995,4,15)
// const fechaIEquio2 : Date = new Date(2022,7,12)
// let kit1: KitDeMangueras = new KitDeMangueras("equipo1","para extraccion",fechaFEquipo1,fechaIEquio1,"bomba centrifuga",3,3/4,Material.plastica)
// kit1.agregarKit(listaKit,kit1)
// console.log(listaKit)