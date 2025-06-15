import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AlumnoService } from 'src/service/alumno.service';
import { CursoService } from 'src/service/curso.service';
import { MatriculaService } from 'src/service/matricula.service';
import { Response } from 'express';
import { MatriculaNuevaDTO } from 'src/dtos/MatriculaNuevaDTO';
import { CursoResultadoDTO } from 'src/dtos/CursoResultadoDTO';
import { AlumnoResultadoDTO } from 'src/dtos/AlumnoResultadoDTO';
import { CursoAltaDTO } from 'src/dtos/CursoAltaDTO';
import { AlumnoAltaDTO } from 'src/dtos/AlumnoAltaDTO';


@Controller('formacion')
export class FormacionController {
  constructor(private readonly alumnoService: AlumnoService,
    private readonly cursoService:CursoService,
    private readonly matriculaService:MatriculaService
  ) {}

  @Get('noMatriculados/:idCurso')
  alumnosNoMatriculados(@Param('idCurso') idCurso:number):Promise<AlumnoResultadoDTO[]>{
    return this.alumnoService.findByAlumnosNoMatriculadosEncurso(idCurso);
  }

  @Get('cursos')
  obtieneCursos():Promise<CursoResultadoDTO[]>{
    return this.cursoService.findAll();
  }

  @Post('matricular')
  async matricular(@Body() datos:MatriculaNuevaDTO, @Res() response:Response):Promise<any>{
    const resultado:boolean = await this.matriculaService.matricular(datos.usuario,datos.idCurso);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }

  @Post('nuevoCurso')
  nuevoCurso(@Body() curso:CursoAltaDTO){
    return this.cursoService.save(curso);
  }

  @Post('nuevoAlumno')
  nuevoAlumno(@Body() alumno:AlumnoAltaDTO){
    return this.alumnoService.save(alumno);
  }
  
}
