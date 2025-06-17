export class ClienteDatosdto{
    usuario:string;
    password:string;
    email:string;
    telefono:number;

    constructor(usuario?:string,password?:string,email?:string,telefono?:number){
        this.usuario=usuario||'';
        this.password=password||'';
        this.email=email||'';
        this.telefono=telefono||0;
    }
}