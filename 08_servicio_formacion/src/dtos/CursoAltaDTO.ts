import { IsDate, IsInt, IsNumber, IsString, Length } from "class-validator";

export class CursoAltaDTO{
        @IsString()
        @Length(2,20)
        nombre:string;
        @IsInt()
        duracion:number;
        @IsDate()
        fechaInicio:Date;
        @IsNumber()
        precio:number;
       
    
    
        constructor(nombre?:string,duracion?:number,fechaInicio?:Date,precio?:number){
            this.nombre=nombre;
            this.duracion=duracion;
            this.fechaInicio=fechaInicio;
            this.precio=precio;      
        }
}