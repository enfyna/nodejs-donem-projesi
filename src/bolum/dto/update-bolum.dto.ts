import { PartialType } from '@nestjs/mapped-types';
import { CreateBolumDto } from './create-bolum.dto';

export class UpdateBolumDto extends PartialType(CreateBolumDto) {}
