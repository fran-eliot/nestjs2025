import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PaisesService } from 'src/service/paises.service';



@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  
  @Get('paisMasPoblado')
  paisMasPoblado() {
    return this.paisesService.findPoblacionMax();
  }

  @ApiOperation({summary:"Lista de continentes",description:"A partir del nombre del continente, devuelve la lista de paises"}) 
  @Get('paisesContinente/:continente')
  paisesContinente(@Param('continente') continente: string) {
    return this.paisesService.findByContinente(continente);
  }

  @Get('continentes')
  continentes(){
    return this.paisesService.findAllContinentes();
  }

}
