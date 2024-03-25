import { PartialType } from '@nestjs/mapped-types';
import { CreateOgrenciDto } from './create-ogrenci.dto';

export class UpdateOgrenciDto extends PartialType(CreateOgrenciDto) {}
