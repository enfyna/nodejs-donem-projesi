import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOgrenciDto } from './dto/create-ogrenci.dto';
import { UpdateOgrenciDto } from './dto/update-ogrenci.dto';
import { Ogrenci } from './entities/ogrenci.entity';

@Injectable()
export class OgrenciService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Ogrenci) private readonly ogrenciRepository: Repository<Ogrenci>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createOgrenciDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  createOgrenci(createOgrenciDto: CreateOgrenciDto): Promise<Ogrenci> {
    const ogrenci: Ogrenci = new Ogrenci();
    ogrenci.name = createOgrenciDto.name;
    ogrenci.email = createOgrenciDto.email;
    ogrenci.deptid = createOgrenciDto.deptid;
    ogrenci.counter = createOgrenciDto.counter;
    return this.ogrenciRepository.save(ogrenci);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllOgrenci(): Promise<Ogrenci[]> {
    return this.ogrenciRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  viewOgrenci(id: number): Promise<Ogrenci> {
    return this.ogrenciRepository.findOneBy({ id });
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateOgrenciDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateOgrenci(id: number, updateOgrenciDto: UpdateOgrenciDto): Promise<Ogrenci> {
    const ogrenci: Ogrenci = new Ogrenci();
    ogrenci.name = updateOgrenciDto.name;
    ogrenci.email = updateOgrenciDto.email;
    ogrenci.deptid = updateOgrenciDto.deptid;
    ogrenci.counter = updateOgrenciDto.counter;
    ogrenci.id = id;
    return this.ogrenciRepository.save(ogrenci);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeOgrenci(id: number): Promise<{ affected?: number }> {
    return this.ogrenciRepository.delete(id);
  }
}