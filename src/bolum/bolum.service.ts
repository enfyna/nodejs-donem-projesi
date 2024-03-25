import { Injectable } from '@nestjs/common';
import { CreateBolumDto } from './dto/create-bolum.dto';
import { UpdateBolumDto } from './dto/update-bolum.dto';

@Injectable()
export class BolumService {
  create(createBolumDto: CreateBolumDto) {
    return 'This action adds a new bolum';
  }

  findAll() {
    return `This action returns all bolum`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bolum`;
  }

  update(id: number, updateBolumDto: UpdateBolumDto) {
    return `This action updates a #${id} bolum`;
  }

  remove(id: number) {
    return `This action removes a #${id} bolum`;
  }
}
