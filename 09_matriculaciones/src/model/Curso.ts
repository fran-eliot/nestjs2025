import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Matricula } from "./Matricula";

@Entity('cursos')
export class Curso{
    @PrimaryGeneratedColumn()
    idCurso:number;
    @Column()
    nombre:string;
    @Column()
    duracion:number;
    @Column()
    fechaInicio:Date;
    @Column()
    precio:number;
    @OneToMany(()=>Matricula,matricula=>matricula.curso)
    matriculas:Matricula[];
    


    constructor(idCurso?:number,nombre?:string,duracion?:number,fechaInicio?:Date,precio?:number){
        this.idCurso=idCurso;
        this.nombre=nombre;
        this.duracion=duracion;
        this.fechaInicio=fechaInicio;
        this.precio=precio;


    }
}