import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './model/Alumno';
import { Curso } from './model/Curso';
import { AlumnoController } from './controller/alumno.controller';
import { CursoController } from './controller/curso.controller';
import { AlumnoService } from './service/alumno.service';
import { CursoService } from './service/curso.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nestuser',
    password: 'nestpass',
    database: 'formacion',
    entities: [Alumno,Curso],
    synchronize: false,
  }), TypeOrmModule.forFeature([Alumno,Curso])],
  controllers: [AlumnoController,CursoController],
  providers: [AlumnoService,CursoService],
})
export class AppModule {}
