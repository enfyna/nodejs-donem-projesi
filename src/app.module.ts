import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OgrenciModule } from './ogrenci/ogrenci.module';
import { BolumModule } from './bolum/bolum.module';
import { Ogrenci } from './ogrenci/entities/ogrenci.entity';
import { Bolum } from './bolum/entities/bolum.entity';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '',
      username: 'admin',
      entities: [Ogrenci, Bolum],
      database: 'nodejs_proje_db',
      synchronize: true,
      logging: true,
    }),
    OgrenciModule,
    BolumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
