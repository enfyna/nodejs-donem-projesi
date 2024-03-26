import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BolumService } from './bolum.service';
import { CreateBolumDto } from './dto/create-bolum.dto';
import { UpdateBolumDto } from './dto/update-bolum.dto';

@Controller('bolum')
export class BolumController {
  constructor(private readonly bolumService: BolumService) {}

  @Post()
  create(@Body() createBolumDto: CreateBolumDto) {
    return this.bolumService.createBolum(createBolumDto);
  }

  @Get()
  findAll() {
    return this.bolumService.findAllBolum();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bolumService.findOneBolum(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBolumDto: UpdateBolumDto) {
    return this.bolumService.updateBolum(+id, updateBolumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bolumService.removeBolum(+id);
  }
}
