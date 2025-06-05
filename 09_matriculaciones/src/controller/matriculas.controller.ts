import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MatriculasService } from 'src/service/matriculas.service';


@Controller('matriculacion')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Get('matriculas/:idCurso')
  getMatricula(@Param() idCurso:number){
    return this.matriculasService.findByCurso(idCurso);
  }
}
