import { Module } from '@nestjs/common';
import { BuscadorService } from './service/buscador.service';
import { BuscadorController } from './controller/buscador.controller';

@Module({
  imports: [],
  controllers: [BuscadorController],
  providers: [BuscadorService],
})
export class AppModule {}
