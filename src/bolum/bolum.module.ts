import { Module } from '@nestjs/common';
import { BolumService } from './bolum.service';
import { BolumController } from './bolum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bolum } from './entities/bolum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bolum])],
  controllers: [BolumController],
  providers: [BolumService],
})
export class BolumModule {}
