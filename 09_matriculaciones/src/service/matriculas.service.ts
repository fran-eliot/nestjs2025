import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatriculaDatosDTO } from 'src/dtos/MatriculaDatosDTO';
import { Alumno } from 'src/model/Alumno';
import { Curso } from 'src/model/Curso';
import { Matricula } from 'src/model/Matricula';
import { Repository } from 'typeorm';


@Injectable()
export class MatriculasService {
  constructor(@InjectRepository(Matricula) private readonly matriculasRepository:Repository<Matricula>
  ){}

  async findByCurso(idCurso:number):Promise<MatriculaDatosDTO[]>{
    const matriculas:Matricula[]= await this.matriculasRepository
    .createQueryBuilder('matricula')
    .innerJoinAndSelect('matricula.curso','curso')
    .innerJoinAndSelect('matricula.alumno','alumno')
    .where('curso.idCurso= :idCurso',{idCurso})
    .getMany();
    return matriculas.map(m=>new MatriculaDatosDTO(m.alumno.nombre,m.alumno.email,m.curso.nombre,m.nota))
    
  }



}
