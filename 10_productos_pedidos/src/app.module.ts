import { Module } from '@nestjs/common';
import { PedidosProductosController } from './controller/pedidos-productos.controller';
import { ProductosService } from './service/productos.service';
import { PedidosService } from './service/pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './model/Producto';
import { Pedido } from './model/Pedido';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'tiendavirtual',
    entities: [Pedido,Producto],
    synchronize: false,
  }), TypeOrmModule.forFeature([Pedido,Producto])],
  controllers: [PedidosProductosController],
  providers: [ProductosService,PedidosService],
})
export class AppModule {}
