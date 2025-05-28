import { Module } from '@nestjs/common';
import { MovimientosController } from './controller/movimientos.controller';
import { MovimientosService } from './service/movimientos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './model/Movimiento';
import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { Cuenta } from './model/Cuenta';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'nestuser',
    password: 'nestpass',
    database: 'bancabd',
    entities: [Movimiento,Cuenta],
    synchronize: false,
  }), TypeOrmModule.forFeature([Movimiento,Cuenta])],
  controllers: [MovimientosController,CuentasController],
  providers: [MovimientosService,CuentasService],
})
export class AppModule {}
