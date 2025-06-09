import { IsInt, IsNumber, IsString } from "class-validator";

export class PedidoAltaDto{
    @IsString()
    producto:string;
    @IsInt()
    unidades:number;
    @IsNumber()
    precioUnitario:number;

    constructor(producto?:string,unidades?:number,precioUnitario?:number){
        this.producto=producto;
        this.unidades=unidades;
        this.precioUnitario=precioUnitario;
    }
}