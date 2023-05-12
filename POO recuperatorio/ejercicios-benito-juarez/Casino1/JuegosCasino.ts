export class JuegoDeCasino{

    protected fabricante: string;
    protected procedencia: string;
    protected fechaDeFabricacion: Date;
    protected fechaDeInstalacion: Date;
    
    public constructor(fechaFabricacion:Date, fechaInstalacion: Date){

        this.fabricante = "JuegosLJ"
        this.procedencia = "China"
        this.fechaDeFabricacion = fechaFabricacion;
        this.fechaDeInstalacion = fechaInstalacion
    }

    public getInfo() :JuegoDeCasino{
        console.log(this)
        return this
    }

}
