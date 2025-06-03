import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoResultadoDTO } from 'src/dtos/CursoResultadoDTO';
import { Curso } from 'src/model/Curso';
import { Repository } from 'typeorm';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private readonly cursosRepository:Repository<Curso>){}
  async findAll():Promise<CursoResultadoDTO[]>{
    return (await this.cursosRepository.find())
    .map(c=>new CursoResultadoDTO(c.idCurso,c.nombre,c.duracion,c.fechaInicio,c.precio));
  }
}
