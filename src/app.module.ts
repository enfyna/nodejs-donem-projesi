import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OgrenciModule } from './ogrenci/ogrenci.module';
import { BolumModule } from './bolum/bolum.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'simform',
      username: 'postgres',
      entities: [],
      database: 'pgWithNest',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    OgrenciModule,
    BolumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}