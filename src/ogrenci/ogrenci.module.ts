import { Module } from '@nestjs/common';
import { OgrenciService } from './ogrenci.service';
import { OgrenciController } from './ogrenci.controller';

@Module({
  controllers: [OgrenciController],
  providers: [OgrenciService],
})
export class OgrenciModule {}
