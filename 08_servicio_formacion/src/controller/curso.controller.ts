import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Curso } from 'src/model/Curso';
import { CursoService } from 'src/service/curso.service';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Get('todos')
  obtieneCursos():Promise<Curso[]>{
    return this.cursoService.findAll();
  }
}
