import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alumno } from "./Alumno";
import { AlumnoResultadoDTO } from "src/dtos/AlumnoResultadoDTO";

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
    @ManyToMany(()=>Alumno,alumno=>alumno.cursos)
    @JoinTable({
        name: 'matriculas', // Nombre de la tabla de unión
        joinColumn: {
            name: 'idCurso', // Columna que conecta con la tabla Curso
            referencedColumnName: 'idCurso',
        },
        inverseJoinColumn: {
            name: 'usuario', // Columna que conecta con la tabla Alumno
            referencedColumnName: 'usuario',
        },
    })
    alumnos:Alumno[];
    


    constructor(idCurso?:number,nombre?:string,duracion?:number,fechaInicio?:Date,precio?:number){
        this.idCurso=idCurso;
        this.nombre=nombre;
        this.duracion=duracion;
        this.fechaInicio=fechaInicio;
        this.precio=precio;


    }
}