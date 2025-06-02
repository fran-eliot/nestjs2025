import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Alumno } from 'src/model/Alumno';
import { AlumnoService } from 'src/service/alumno.service';

@Controller('alumnos')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Get('noMatriculados/:idCurso')
  obtieneAlumnosNoMatriculadosCurso(@Param('idCurso') idCurso:number):Promise<Alumno[]>{
    return this.alumnoService.findByAlumnosNoMatriculadosEncurso(idCurso);
  }
}
