
import { Module } from '@nestjs/common';
import { Curso } from './model/Curso';
import { Alumno } from './model/Alumno';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './model/Matricula';
import { MatriculasController } from './controller/matriculas.controller';
import { MatriculasService } from './service/matriculas.service';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'formacion',
    entities: [Curso,Alumno,Matricula],
    synchronize: false,
  }), TypeOrmModule.forFeature([Curso,Alumno,Matricula])],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class AppModule {}
