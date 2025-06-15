import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Producto } from "./Producto";

Entity('pedidos')
export class Pedido{
    @PrimaryGeneratedColumn()
    idPedido:number;
    @ManyToOne(()=>Producto,p=>p.pedidos)
    @JoinColumn({name:"codigoProducto",referencedColumnName:"codigoProducto"})
    producto:Producto;
    @Column()
    unidades:number;
    @Column()
    total:number;
    @Column()
    fechaPedido:Date;

    constructor(idPedido?:number,producto?:Producto,unidades?:number,total?:number,fechaPedido?:Date){
        this.idPedido=idPedido;
        this.producto=producto;
        this.unidades=unidades;
        this.total=total;
        this.fechaPedido=fechaPedido;
    }
}