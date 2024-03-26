import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OgrenciService } from './ogrenci.service';
import { OgrenciController } from './ogrenci.controller';
import { Ogrenci } from './entities/ogrenci.entity';
import { Bolum } from 'src/bolum/entities/bolum.entity';
import { BolumService } from 'src/bolum/bolum.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ogrenci, Bolum])],
  controllers: [OgrenciController],
  providers: [OgrenciService, BolumService],
})

export class OgrenciModule {}
