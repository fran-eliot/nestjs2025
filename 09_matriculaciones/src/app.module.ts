import { Module } from '@nestjs/common';
import { Curso } from './model/Curso';
import { Alumno } from './model/Alumno';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './model/Matricula';
import { MatriculasController } from './controller/matriculas.controller';
import { MatriculasService } from './service/matriculas.service';
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // hace que esté disponible en toda la app
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          type: 'mysql',
          host: config.get('URL_BD'),
          port: parseInt(config.get('PORT_BD')),
          username: config.get('USER_NAME'),
          password: config.get('PASSWORD'),
          database: 'formacion',
          entities: [Curso,Alumno,Matricula],
          synchronize: true, 
        }),
      }) , TypeOrmModule.forFeature([Curso,Alumno,Matricula])],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class AppModule {}
