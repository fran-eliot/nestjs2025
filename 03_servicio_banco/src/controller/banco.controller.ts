import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Cuenta } from 'src/model/Cuenta';

import { BancoService } from 'src/service/banco.service';

import { Response } from 'express';

@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}

  @Post('alta')
  create(@Body() cuenta:Cuenta ,@Res() response:Response):void {
    const resultado:boolean = this.bancoService.save(cuenta);
    if(resultado){
      //devolver codigo 200
      response.status(200).send();
    }else{
      //devolver codigo 409
      response.status(409).send();
    }
  }


  @Get('buscar/:num_cuenta')
  buscar(@Param("num_cuenta") num_cuenta:string,@Res() response:Response):Response{
    const cuenta = this.bancoService.findByNumeroCuenta(num_cuenta);
    if(cuenta){
      return response.status(200).json(cuenta);
    }else{
      return response.status(419).json(new Cuenta());
    }
  }

  @Get('buscar_tipo/:tipo')
  buscar_tipo(@Param("tipo") tipo:string):Cuenta[]{
    return this.bancoService.findByTipo(tipo);
  }

  @Get('buscar_saldo_minimo/:saldo_min')
  buscar_saldo_minimo(@Param("saldo_min") saldo_min:number):Cuenta[]{
    return this.bancoService.findBySaldoMin(saldo_min);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bancoService.findOne(+id);
  // }


  @Delete(':num_cuenta')
  remove(@Param('num_cuenta') num_cuenta:string) {
    return this.bancoService.deleteByNumeroCuenta(num_cuenta);
  }
}
