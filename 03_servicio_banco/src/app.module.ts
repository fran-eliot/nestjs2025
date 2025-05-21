import { Module } from '@nestjs/common';
import { BancoController } from './controller/banco.controller';
import { BancoService } from './service/banco.service';

@Module({
  imports: [],
  controllers: [BancoController],
  providers: [BancoService],
})
export class AppModule {}
