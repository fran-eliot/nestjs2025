import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumnoResultadoDTO } from 'src/dtos/AlumnOResultadoDTO';
import { Alumno } from 'src/model/Alumno';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnoService {
  constructor(@InjectRepository(Alumno) private readonly alumnosRepository:Repository<Alumno>){}

  async findByIdCurso(idCurso:number):Promise<AlumnoResultadoDTO[]>{
    return ( await this.alumnosRepository.createQueryBuilder("alumno")
    .innerJoin("alumno.cursos", "c") // Relación con la tabla cursos
    .where("c.idCurso = :idCurso", { idCurso }) // Corrección en la sintaxis del parámetro
    .getMany());
    // .map(a=>new AlumnoResultadoDTO(a.usuario,a.password,a.nombre,a.email,a.edad)); // Obtiene los alumnos relacionados con el curso
  }

  async findByAlumnosNoMatriculadosEncurso(idCurso:number):Promise<AlumnoResultadoDTO[]> {
    const alumnosMatriculados:AlumnoResultadoDTO[] = await this.findByIdCurso(idCurso);
    // Extraer los IDs de los alumnos matriculados 
    const usuariosMatriculados:string[] = alumnosMatriculados.map(alumno => alumno.usuario);
    // Si no hay alumnos matriculados, devolver todos los alumnos 
    if (usuariosMatriculados.length === 0) { 
      return this.alumnosRepository.find(); }
    
    // Realizar la consulta para obtener los alumnos que no están en la lista de IDs
    return (await this.alumnosRepository.createQueryBuilder("alumno")
      .where("alumno.usuario NOT IN (:...usuariosMatriculados)", { usuariosMatriculados })
      .getMany());
      // .map(a=>new AlumnoResultadoDTO(a.usuario,a.password,a.nombre,a.email,a.edad));
      //Lo anterior se hace de forma automática si los nombres de campos coinciden
  }

  // async findByAlumnosNoMatriculadosEnCurso(idCurso:number):Promise<Alumno[]>{
  //   return this.alumnosRepository.createQueryBuilder("alumno")
  //   .leftJoin("alumno.cursos", "c") // LEFT JOIN con la relación cursos
  //   .where("c.idCurso IS NULL OR c.idCurso != :idCurso", { idCurso }) // Filtrar alumnos no matriculados en el curso dado
  //   .getMany(); // Obtener los resultados
  // }
}
