import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,

} from '@nestjs/common';
import { ComprasService } from 'src/service/compras.service';
import { PedidoDto } from 'src/dtos/PedidoDto';
import { ProductoDto } from 'src/dtos/ProductoDto';
import { Response } from 'express';


@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get('catalogo')
  async buscarProductos(@Query('min') min:number,@Query('max') max:number,@Res() response:Response){
  
    const productos:ProductoDto[]=await this.comprasService.getProductosRango(min,max);
    if (productos.length>0){
      return response.status(200).json(productos);
    }else{
      return response.status(409).json([]);
    }
    
  }

  @Post('nuevoPedido')
  async nuevoPedido(@Body() pedido:PedidoDto,@Res() response:Response){
    const res:boolean=await this.comprasService.nuevoPedido(pedido);
    if (res){
      response.status(200).send();
    }else{
      response.status(409).send();
    }

  }
  
}
