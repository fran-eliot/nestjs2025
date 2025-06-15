import { Injectable } from '@nestjs/common';
import { Alumno } from 'src/model/Alumno';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from 'src/model/Curso';


@Injectable()
export class MatriculaService {

  constructor(@InjectRepository(Alumno) private readonly alumnosRepository:Repository<Alumno>,
    @InjectRepository(Curso) private readonly cursosRepository:Repository<Curso>
  ){}
  
  async matricular(usuario:string,idCurso:number):Promise<boolean>{
    const alumno:Alumno=  await this.alumnosRepository
    .createQueryBuilder("alumno")
    .where("alumno.usuario= :usuario",{usuario})
    .getOne();

    const curso:Curso = await this.cursosRepository
    .createQueryBuilder("curso")
    .innerJoinAndSelect("curso.alumnos","a")
    .where("curso.idCurso= :idCurso",{idCurso})
    .getOne();

    if (!alumno || !curso)
      return false;
    //Añadimos el alumno al curso y actualizamos el curso
    curso.alumnos.push(alumno);

    await this.cursosRepository.save(curso);
    return true;
  }
  
}
