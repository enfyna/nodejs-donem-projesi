import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OgrenciModule } from './ogrenci/ogrenci.module';
import { BolumModule } from './bolum/bolum.module';
import { Ogrenci } from './ogrenci/entities/ogrenci.entity';
import { Bolum } from './bolum/entities/bolum.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { OgrenciSayac } from './ogrenci-sayac/entities/ogrenci-sayac.entity';
import { BackupService } from './backup.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', ''),
        port: configService.get<number>('DB_PORT', 0),
        username: configService.get<string>('DB_USERNAME', ''),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', ''),
        entities: [Ogrenci, Bolum, OgrenciSayac],
        synchronize: configService.get<boolean>('DB_SYNC', true),
        logging: configService.get<boolean>('DB_LOGGING', true),
      }),
    }),
    ScheduleModule.forRoot(),
    OgrenciModule,
    BolumModule,
  ],
  controllers: [AppController],
  providers: [AppService, BackupService],
})
export class AppModule { }
