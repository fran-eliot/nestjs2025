export class AlumnoResultadoDTO{


        usuario:string;
        nombre:string;
        email:string;
        edad:number;

    
        constructor(usuario?:string, nombre?:string, email?:string, edad?:number){
            this.usuario=usuario;
            this.nombre=nombre;
            this.email = email;
            this.edad = edad;
        }

}