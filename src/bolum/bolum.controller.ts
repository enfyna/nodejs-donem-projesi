import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BolumService } from './bolum.service';
import { CreateBolumDto } from './dto/create-bolum.dto';
import { UpdateBolumDto } from './dto/update-bolum.dto';

@Controller('bolum')
export class BolumController {
  constructor(private readonly bolumService: BolumService) {}

  @Post()
  create(@Body() createBolumDto: CreateBolumDto) {
    return this.bolumService.create(createBolumDto);
  }

  @Get()
  findAll() {
    return this.bolumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBolumDto: UpdateBolumDto) {
    return this.bolumService.update(+id, updateBolumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolumService.remove(+id);
  }
}
