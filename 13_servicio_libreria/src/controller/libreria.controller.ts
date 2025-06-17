import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { of } from 'rxjs';
import { ClienteDatosdto } from 'src/dtos/ClienteDatosDto';
import { LibroDatosdto } from 'src/dtos/LibroDatosDto';
import { ClientesService } from 'src/service/clientes.service';
import { ComprasService } from 'src/service/compras.service';
import { LibrosService } from 'src/service/libros.service';


@Controller('librerias')
export class LibreriaController {
  constructor(private readonly clientesService: ClientesService,
    private readonly comprasService:ComprasService,
    private readonly librosService:LibrosService
  ) {}

  @Post('autenticar')
  async autenticar(@Body() cli:ClienteDatosdto,@Res() response:Response){
    const cliente:ClienteDatosdto= await this.clientesService.autenticar(cli.usuario,cli.password);

    if (cliente){
      //creamos una cookie
      response.cookie('user',cliente.usuario,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        secure:false
      });

    }
    return response.json(cliente);
  }

  @Get('catalogo')
  catalogo():Promise<LibroDatosdto[]>{
    return this.librosService.catalogo();
  }

  @Get('compras')
  comprasUsuario(@Req() req:Request){
    const usuario:string=req.cookies['user'];
    if (usuario){
      return this.comprasService.ventasCliente(usuario);
    }
    // return of([]);
    return [];
  }

}
