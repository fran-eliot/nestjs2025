import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './model/Alumno';
import { Curso } from './model/Curso';
import { AlumnoService } from './service/alumno.service';
import { CursoService } from './service/curso.service';
import { FormacionController } from './controller/formacion.controller';
import { MatriculaService } from './service/matricula.service';

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
  controllers: [FormacionController],
  providers: [AlumnoService,CursoService,MatriculaService],
})
export class AppModule {}
