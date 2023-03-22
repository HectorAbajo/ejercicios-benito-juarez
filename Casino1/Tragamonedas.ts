import { JuegoDeCasino } from "./JuegosCasino";

export class TragaMonedas extends JuegoDeCasino{

    private apuesta: number;
    private apuestaMin: number;
    private apuestaMax: number;
    private ganancia$: number;
    private numGanador: number;
    public arrayNum: number [];


    public constructor(fechaDeF: Date, fechaDeI: Date){
        super(fechaDeF, fechaDeI)
        this.apuesta = 0;
        this.apuestaMin = 100;
        this.apuestaMax = 2000;
        this.ganancia$ = 0;
        this.numGanador = 0;
        this.arrayNum = [] 
    }

    private girar(){
        let min: number = 1;
        let max: number = 7
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public apostar(apuesta: number){
        if((apuesta <= this.apuestaMax) && (apuesta > this.apuestaMin)){
            const num1: number = this.girar()
            this.arrayNum.push(num1)
            const num2: number = this.girar()
            this.arrayNum.push(num2)
            const num3: number = this.girar()
            this.arrayNum.push(num3)
            // this.arrayNum = [7,7,7]
            console.log(this.arrayNum)
            this.ganancia(apuesta)
        }
    }

    private ganancia(apuesta: number){
        if((this.arrayNum[0] === this.arrayNum[1]) && (this.arrayNum[1] === this.arrayNum[2])){
            this.ganancia$ = apuesta*2000000
            console.log("SOS MILLONARIO!!!!!!")
            return this.ganancia$
        }
        if((this.arrayNum[0] === this.arrayNum[1]) && (this.arrayNum[1] != this.arrayNum[2])){
            this.ganancia$ = apuesta*100
            console.log("GANASTE!!!!!!" + "$" + this.ganancia$)
            return this.ganancia$
        }
        if((this.arrayNum[0] != this.arrayNum[1]) && (this.arrayNum[1] === this.arrayNum[2])){
            this.ganancia$ = apuesta*200
            console.log("GANASTE!!!!!!" + "$" + this.ganancia$)
            return this.ganancia$
        }
        else{
            console.log("Perdiste")
        }

    }
}

