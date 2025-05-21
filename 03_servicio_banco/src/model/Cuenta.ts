export class Cuenta{
    num_cuenta:string;
    titular:string;
    tipo:string;
    saldo:number;

    constructor(num_cuenta?:string,titular?:string,tipo?:string,saldo?:number){
        this.num_cuenta = num_cuenta;
        this.titular = titular;
        this.tipo = tipo;
        this.saldo = saldo;
    }
}