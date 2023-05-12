import { Auto } from "./Auto";
const lista : Auto[] = []

export class RegistroAutomotor {

    listado(array : Auto[]){
        console.log(array)
    }

    borrar(array : Auto[] , auto : Auto ){
    let autoEncomtrado = array.findIndex(element => element === auto)
    if(autoEncomtrado >= 0){
        array.splice(autoEncomtrado,1)
    }
    else{
        console.log("Auto Inexistente")
    }
    }

    private actualizar(array : Auto[] ,auto : Auto){
        array.push(auto)
    }

    darDeAlata( array : Auto[] , auto : Auto){
    let autoAlta : number = array.findIndex(element => element == auto)
        if(autoAlta === -1){
            this.actualizar(array,auto)
        }
        else{
            console.log("Auto ya enlistado")
        }
}
}


const baseDato : RegistroAutomotor = new RegistroAutomotor
const nuevoAuto1 : Auto = new Auto('Opel','sedan','1986','nafta','782sdh59','335f6d6')
const nuevoAuto2 : Auto = new Auto ('Renault' , 'Sedan' , '1998' , 'Nafta' , '455826cf' , '665dsf6s6')
const nuevoAuto3 : Auto = new Auto ('Ferrai','Coupe','1985','Nafta','669gfd86sd','s96942ss8')
const nuevoAuto4 : Auto = new Auto ('Volkwagen','Camionta','2010','Gas Oil','23564f95f','vds66g9a')
// baseDato.listado(lista)
baseDato.darDeAlata(lista,nuevoAuto1)
baseDato.darDeAlata(lista,nuevoAuto2)
baseDato.darDeAlata(lista,nuevoAuto3)
baseDato.darDeAlata(lista,nuevoAuto4)
// baseDato.listado(lista)
// baseDato.borrar(lista,nuevoAuto1)
// baseDato.listado(lista)
