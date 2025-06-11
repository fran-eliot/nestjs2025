import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAltaDto } from 'src/dtos/PedidoAltaDto';
import { PedidoDatosDto } from 'src/dtos/PedidoDatosDto';
import { Pedido } from 'src/model/Pedido';
import { Producto } from 'src/model/Producto';
import { Repository } from 'typeorm';


@Injectable()
export class PedidosService {
  
  constructor(@InjectRepository(Producto) private readonly productosRepository:Repository<Producto>, 
    @InjectRepository(Pedido) private readonly pedidosRepository:Repository<Pedido>
    ){}

      async altaPedido(pedido:PedidoAltaDto):Promise<boolean>{
        const prod:Producto=await this.productosRepository.
        createQueryBuilder('producto')
        .where('producto=:name',{name:pedido.producto})
        .getOne();
        // const prod2:Producto=await this.productosRepository
        // .findOneBy({producto:pedido.producto});
        if(prod && prod.stock>=pedido.unidades){
          prod.stock=prod.stock-pedido.unidades;
          this.productosRepository.save(prod);
          const fecha:Date = new Date();
          const pedidoNuevo:Pedido = new Pedido(0, pedido.unidades,pedido.precioUnitario*pedido.unidades,fecha,prod);
          this.pedidosRepository.save(pedidoNuevo);
          return true;
        }else{
          return false;
        }
        
        
      }

        async getPedidos(): Promise<PedidoDatosDto[]> {
          const pedidos: Pedido[] = await this.pedidosRepository.find({
            relations: ['producto'],
          });

          const pedidos2:Pedido[] = await this.pedidosRepository
          .createQueryBuilder('pedido')
          .innerJoinAndSelect('pedido.producto','p')
          .getMany();
      
          const pedidosDto = pedidos.map((p) => {
            const producto = p.producto.producto;
            return new PedidoDatosDto(producto, p.unidades, p.total, p.fechaPedido);
          });
      
          return pedidosDto;
        }
}
