export class Equipo{

    protected idEquipo : string;
    protected descripcion : string;
    protected fechaFabricacion : Date;
    protected fechaInstalacion : Date;

    constructor(id: string, descripcion: string, fechaF: Date, fechaI: Date){
        this.idEquipo = id;
        this.descripcion = descripcion;
        this.fechaFabricacion = fechaF;
        this.fechaInstalacion = fechaI;

    }

    private modificador (equipoEditar: Equipo, datoModificar: any, valorAsignar : any){

        const arrKey: (string | Date)[] = Object.keys(equipoEditar)
        const data: number = arrKey.indexOf(datoModificar)
        switch(data){

            case 0 :
                if(typeof(valorAsignar) == "string")
                {equipoEditar.idEquipo = valorAsignar}
                else{console.log("invalido")}
                break;

            case 1 :
                if(typeof(valorAsignar) == "string")
                {equipoEditar.descripcion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 2 :
                if(valorAsignar == Date)
                {equipoEditar.fechaFabricacion = valorAsignar}
                else{console.log("invalido")}
                break;

            case 3 :
                if(valorAsignar == Date)
                {equipoEditar.fechaInstalacion = valorAsignar}
                else{console.log("invalido")}
                break;

            default :
                console.log("dato erroneo")
                break;
        }
        const equipoEditado = equipoEditar;
        return equipoEditado
    }

    private comprovacionEquipo(array: Equipo [], nuevoEquipo: Equipo): number{

        if(array.indexOf(nuevoEquipo) === -1){
        return -1
    }
        else{
            const indexEquipo = array.indexOf(nuevoEquipo)
            return indexEquipo
        }
    }

    agregar(array: Equipo [], nuevoEquipo : Equipo){

        if(this.comprovacionEquipo(array, nuevoEquipo) === -1){
            array.push(nuevoEquipo)
            return array
        }
        if(this.comprovacionEquipo(array,nuevoEquipo) >= 0){
            console.log("equipo ya existente")
        }
        else{
            console.log("equipo invalido")
        }
    }

    leer(equipo: Equipo): Equipo{

        const equipoALeer : Equipo = equipo
        console.log(equipoALeer)
        return equipoALeer
    }

    editar(array: Equipo[], equipo: Equipo, datoModificar : string, valorAsignar: string|Date ): Equipo{

        if(this.comprovacionEquipo(array, equipo) >= 0){
            const indexEditar: number = this.comprovacionEquipo(array,equipo)
            // console.log(indexEditar)
            let equipoEditar : Equipo = array[indexEditar]
            // console.log(equipoEditar)
            equipoEditar.modificador(equipoEditar,datoModificar,valorAsignar)
            const equipoEditado : Equipo = equipoEditar.modificador(equipoEditar,datoModificar,valorAsignar)
            equipo = equipoEditado
            // console.log(equipoEditado)
        }
        return equipo
    }

    eliminar(array: Equipo[], equipoElimin : any){

        if(this.comprovacionEquipo(array, equipoElimin) >= 0){
            array.splice(equipoElimin,1)
        }
    }
}

// const listaEquipos : Equipo [] = []
// const fechaFEquipo1 : Date = new Date(1998,11,22)
// const fechaIEquio1 : Date = new Date(2020,5,2)
// const fechaFEquipo2 : Date = new Date(1995,4,15)
// const fechaIEquio2 : Date = new Date(2022,7,12)

// let equipo1: Equipo = new Equipo("equipo1","para pileta",fechaFEquipo1,fechaIEquio1)
// let equipo2: Equipo = new Equipo("equipo2","para molino",fechaFEquipo2,fechaIEquio2)
// equipo1.agregar(listaEquipos,equipo1)
// equipo2.agregar(listaEquipos,equipo2)
// // console.log(listaEquipos)
// // console.log(equipo1)
// equipo1.editar(listaEquipos,equipo1,"fechaFabricacion",fechaFEquipo1)
// // equipo1.eliminar(listaEquipos,equipo1)
// console.log(listaEquipos)