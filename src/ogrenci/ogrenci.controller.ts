import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OgrenciService } from './ogrenci.service';
import { CreateOgrenciDto } from './dto/create-ogrenci.dto';
import { UpdateOgrenciDto } from './dto/update-ogrenci.dto';

@Controller('ogrenci')
export class OgrenciController {
  constructor(private readonly ogrenciService: OgrenciService) {}

  @Post()
  create(@Body() createOgrenciDto: CreateOgrenciDto) {
    return this.ogrenciService.createOgrenci(createOgrenciDto);
  }

  @Get()
  findAll() {
    return this.ogrenciService.findAllOgrenci();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ogrenciService.findOneOgrenci(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOgrenciDto: UpdateOgrenciDto) {
    return this.ogrenciService.updateOgrenci(+id, updateOgrenciDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ogrenciService.removeOgrenci(+id);
  }
}
