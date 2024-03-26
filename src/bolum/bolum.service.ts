import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBolumDto } from './dto/create-bolum.dto';
import { UpdateBolumDto } from './dto/update-bolum.dto';
import { Bolum } from './entities/bolum.entity';

@Injectable()
export class BolumService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Bolum) private readonly bolumRepository: Repository<Bolum>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createBolumDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createBolum(createBolumDto: CreateBolumDto): Promise<Bolum> {
    const bolum: Bolum = new Bolum();
    bolum.name = createBolumDto.name;
    return this.bolumRepository.save(bolum);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllBolum(): Promise<Bolum[]> {
    return this.bolumRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findOneBolum(id: number): Promise<Bolum> {
    return this.bolumRepository.findOneBy({ id });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateBolumDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateBolum(id: number, updateBolumDto: UpdateBolumDto): Promise<Bolum> {
    const bolum: Bolum = new Bolum();
    bolum.id = id;
    bolum.name = updateBolumDto.name;
    return this.bolumRepository.save(bolum);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeBolum(id: number): Promise<{ affected?: number }> {
    return this.bolumRepository.delete(id);
  }

}
