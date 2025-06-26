export class ClienteDatosdto{
    idCliente:number;
    usuario:string;
    password:string;
    email:string;
    telefono:number;

    constructor(idCliente?:number,usuario?:string,password?:string,email?:string,telefono?:number){
        this.idCliente=idCliente||0;
        this.usuario=usuario||'';
        this.password=password||'';
        this.email=email||'';
        this.telefono=telefono||0;
    }
}