import {
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { PedidoAltaDto } from 'src/dtos/PedidoAltaDto';
import { ProductoAltaDto } from 'src/dtos/ProductoAltaDto';
import { PedidosService } from 'src/service/pedidos.service';
import { ProductosService } from 'src/service/productos.service';
import { Response } from 'express';
import { ProductoDto } from 'src/dtos/ProductoDto';
import { PedidoDatosDto } from 'src/dtos/PedidoDatosDto';


@Controller('tienda')
export class PedidosProductosController {
  constructor(private readonly productosService: ProductosService,
    private readonly pedidosService: PedidosService,
  ) {}

  @Get('productos')
 async catalogoProductos(@Res() response:Response):Promise<void>{
    const productos:ProductoDto[]= await this.productosService.catalago();
    if (productos.length>0){
      response.status(200).json(productos);
    }else{ 
      response.status(409).json([]);
    }
  }

  @Get('pedidos')
  async catalogoPedidos(@Res() response:Response):Promise<void>{
    const pedidos:PedidoDatosDto[] = await this.pedidosService.getPedidos();
    if (pedidos.length>0){
      response.status(200).json(pedidos);
    }else{ 
      response.status(409).json([]);
    } 
  }

  @Post('nuevoProducto')
  async nuevoProducto(@Body() datos:any,@Res() response:Response):Promise<void>{
    const producto:ProductoAltaDto = new ProductoAltaDto(datos.codigoProducto, datos.producto, datos.precioUnitario, datos.stock);
    const resultado:boolean = await this.productosService.altaProducto(producto);
    if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }

  @Post('nuevoPedido')
  async nuevoPedido(@Body() datos:any,@Res() response:Response):Promise<void>{
    const pedido:PedidoAltaDto = new PedidoAltaDto(datos.producto,datos.unidades,datos.precioUnitario);
    const resultado:boolean = await this.pedidosService.altaPedido(pedido);
     if(resultado){
      response.status(200).send();
    }else{
      response.status(409).send();
    }
  }


}
    