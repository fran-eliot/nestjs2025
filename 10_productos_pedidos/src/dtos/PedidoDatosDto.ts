import { IsDate, IsNumber, IsString } from "class-validator";

export class PedidoDatosDto{
    @IsString()
    producto:string;
    @IsNumber()
    unidades:number;
    @IsNumber()
    total:number;
    @IsDate()
    fechaPedido:Date;

    constructor(producto?:string,unidades?:number,total?:number,fechaPedido?:Date){
        this.producto=producto;
        this.unidades=unidades;
        this.total=total;
        this.fechaPedido=fechaPedido;
    }
}