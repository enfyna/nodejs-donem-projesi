import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';

@Module({
  providers: [AdminService],
  exports: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin])],
})
export class AdminModule {}
