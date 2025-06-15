import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('seguridad')
export class Usuario{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username:string;
    @Column()
    password:string;
    @Column()
    role:string;

    constructor(username?:string,password?:string,role?:string){
        this.username=username;
        this.password=password;
        this.role=role;
    }
}