import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alumno } from 'src/model/Alumno';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnoService {
  constructor(@InjectRepository(Alumno) private readonly alumnosRepository:Repository<Alumno>){}

  async findByIdCurso(idCurso:number):Promise<Alumno[]>{
    return this.alumnosRepository.createQueryBuilder("alumno")
    .innerJoin("alumno.cursos", "c") // Relación con la tabla cursos
    .where("c.idCurso = :idCurso", { idCurso }) // Corrección en la sintaxis del parámetro
    .getMany(); // Obtiene los alumnos relacionados con el curso
  }

  async findByAlumnosNoMatriculadosEncurso(idCurso:number):Promise<Alumno[]> {
    const alumnosMatriculados = await this.findByIdCurso(idCurso);
    // Extraer los IDs de los alumnos matriculados 
    const idsMatriculados = alumnosMatriculados.map(alumno => alumno.usuario);
    // Si no hay alumnos matriculados, devolver todos los alumnos 
    if (idsMatriculados.length === 0) { 
      return this.alumnosRepository.find(); }
    
    // Realizar la consulta para obtener los alumnos que no están en la lista de IDs
    return this.alumnosRepository.createQueryBuilder("alumno")
      .where("alumno.usuario NOT IN (:...idsMatriculados)", { idsMatriculados })
      .getMany();
  }

  // async findByAlumnosNoMatriculadosEnCurso(idCurso:number):Promise<Alumno[]>{
  //   return this.alumnosRepository.createQueryBuilder("alumno")
  //   .leftJoin("alumno.cursos", "c") // LEFT JOIN con la relación cursos
  //   .where("c.idCurso IS NULL OR c.idCurso != :idCurso", { idCurso }) // Filtrar alumnos no matriculados en el curso dado
  //   .getMany(); // Obtener los resultados
  // }
}
