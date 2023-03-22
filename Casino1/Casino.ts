export class Casino{

    private propietario: string;
    private direccion: string;
    private contactoTel: number;
    private inicioDeActivodades: Date;

    constructor(propietario: string, direccion: string, contactoTel: number, inicioDeActividades: Date){
        this.propietario = propietario;
        this.direccion = direccion;
        this.contactoTel = contactoTel;
        this.inicioDeActivodades = inicioDeActividades;
    }
}