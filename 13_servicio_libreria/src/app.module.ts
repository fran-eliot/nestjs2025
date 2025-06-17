import { Module } from '@nestjs/common';
import { LibreriaController } from './controller/libreria.controller';
import { LibrosService } from './service/libros.service';
import { ClientesService } from './service/clientes.service';
import { ComprasService } from './service/compras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './model/Cliente';
import { Libro } from './model/Libro';
import { Venta } from './model/Venta';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database:'libros',
    entities: [Cliente, Libro, Venta], // Tablas de la base de datos 
    synchronize: false,
  }),
  TypeOrmModule.forFeature([Cliente, Libro, Venta])],
  controllers: [LibreriaController],
  providers: [ClientesService, LibrosService,ComprasService ],
}) 
export class AppModule {}
