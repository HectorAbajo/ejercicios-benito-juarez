import { JuegoDeCasino } from "./JuegosCasino";
import { Casino } from "./Casino";
import { Zona } from "./EnumZona";

export class Ruleta extends JuegoDeCasino{

    private apuesta: number;
    private zonaDeJuego : Zona;
    private apuestaMin: number;
    private apuestaMax: number;
    private ganancia$: number;
    private datos : Casino;


    public constructor(fechaDeF: Date, fechaDeI: Date, zonaDeJuego: Zona, casino: Casino){
        super(fechaDeF, fechaDeI)
        this.apuesta = 0;
        this.apuestaMin = 500;
        this.apuestaMax = 5000;
        this.ganancia$ = 0
        this.zonaDeJuego = zonaDeJuego;
        this.datos = casino
    }
    
    // protected getInfo(){}

    private girarRuleta(): string{
        const array1: string[] = ["Ganaste","Perdiste"]
        const index1: number = Math.floor(Math.random()*array1.length)
        const suerte: string = array1[index1]
        return suerte
    }

    public apostar(apuesta: number, ruleta: Ruleta){

        if((apuesta <= this.apuestaMax) && (apuesta >= this.apuestaMin)){
            if(this.girarRuleta() === "Ganaste"){
                this.ganancia(apuesta,ruleta)
                console.log(this.ganancia$)
            }
            else{console.log("Perdiste")}
            
    }
}

    private ganancia(apuesta: number, ruleta: Ruleta){

        switch (ruleta.zonaDeJuego){

            case 0:
                console.log("Apuesta un Pleno")
                this.ganancia$ = apuesta*36
                break;
            
            case 1:
                console.log("Apuesta un Medio Pleno")
                this.ganancia$ = apuesta*18
                break;

            case 2:
                console.log("Apuesta a Calle")
                this.ganancia$ = apuesta*12
                break;

            case 3:
                console.log("Auesta a Cruz")
                this.ganancia$ = apuesta*9
                break;

            case 4:
                console.log("Apuesta a Linea")
                this.ganancia$ = apuesta*6
                break;

            case 5:
                console.log("Apuesta a Columna")
                this.ganancia$ = apuesta*3
                break;

            case 6:
                console.log("Apuesta a Docena")
                this.ganancia$ = apuesta*3
                break;

            case 7:
                console.log("Apuesta a Mayor")
                this.ganancia$ = apuesta*2
                break;

            case 8:
                console.log("Apuesta a Menor")
                this.ganancia$ = apuesta*2
                break;

            case 9:
                console.log("Apuesta a Color")
                this.ganancia$ = apuesta*2
                break;
        }
    }
}