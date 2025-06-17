export class CompraClienteDto{
    usuario:string;
    tituloLibro:string;
    fechaCompra:Date;

    constructor(usuario?: string, tituloLibro?: string, fechaCompra?: Date) {
        this.usuario = usuario || '';
        this.tituloLibro = tituloLibro || '';
        this.fechaCompra = fechaCompra || new Date();
    }
}