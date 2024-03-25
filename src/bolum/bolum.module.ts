import { Module } from '@nestjs/common';
import { BolumService } from './bolum.service';
import { BolumController } from './bolum.controller';

@Module({
  controllers: [BolumController],
  providers: [BolumService],
})
export class BolumModule {}
