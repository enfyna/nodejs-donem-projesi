import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOgrenciDto } from './dto/create-ogrenci.dto';
import { UpdateOgrenciDto } from './dto/update-ogrenci.dto';
import { Ogrenci } from './entities/ogrenci.entity';
import { Bolum } from 'src/bolum/entities/bolum.entity';
import { OgrenciSayac } from 'src/ogrenci-sayac/entities/ogrenci-sayac.entity';

@Injectable()
export class OgrenciService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Ogrenci) private readonly ogrenciRepository: Repository<Ogrenci>,
    @InjectRepository(Bolum) private readonly bolumRepository: Repository<Bolum>,
    @InjectRepository(OgrenciSayac) private readonly ogrenciSayacRepository: Repository<OgrenciSayac>
  ) { }

  /**
   * this is function is used to create User in User Entity.
   * @param createOgrenciDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createOgrenci(createOgrenciDto: CreateOgrenciDto): Promise<Ogrenci> {
    const ogrenci: Ogrenci = new Ogrenci();
    let bolum = await this.bolumRepository.findOneByOrFail({
      id: createOgrenciDto.deptid,
    });
    ogrenci.dept = bolum;
    ogrenci.name = createOgrenciDto.name;
    ogrenci.email = createOgrenciDto.email;

    let sayac = await this.ogrenciSayacRepository.findOneBy({});
    if (sayac == null) {
      sayac = new OgrenciSayac();
      sayac.sayac = 1;
      await this.ogrenciSayacRepository.save(sayac);
    } else {
      sayac.sayac++;
      await this.ogrenciSayacRepository.update({}, sayac);
    }
    return this.ogrenciRepository.save(ogrenci);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllOgrenci(): Promise<Ogrenci[]> {
    return this.ogrenciRepository.find({
      relations: ['dept'],
    });
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  findOneOgrenci(id: number): Promise<Ogrenci> {
    return this.ogrenciRepository.findOne({
      where: { id: id },
      relations: ['dept'],
    })
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateOgrenciDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  async updateOgrenci(id: number, updateOgrenciDto: UpdateOgrenciDto): Promise<Ogrenci> {
    const ogrenci: Ogrenci = new Ogrenci();
    const bolum = await this.bolumRepository.findOneByOrFail({
      id: updateOgrenciDto.deptid
    });

    ogrenci.id = id;
    ogrenci.name = updateOgrenciDto.name;
    ogrenci.email = updateOgrenciDto.email;
    if (ogrenci.dept && ogrenci.dept.id !== bolum.id)
      ogrenci.dept = bolum;
    else {
      delete ogrenci.dept
    }
    return this.ogrenciRepository.save(ogrenci);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */

  async removeOgrenci(id: number): Promise<{ affected?: number }> {
    let sayac = await this.ogrenciSayacRepository.findOneBy({});
    if (sayac == null) {
      sayac = new OgrenciSayac();
      sayac.sayac = 0;
      await this.ogrenciSayacRepository.save(sayac);
    } else {
      if (sayac.sayac != 0) {
        sayac.sayac--;
        await this.ogrenciSayacRepository.update({}, sayac);
      }
    }
    return this.ogrenciRepository.delete(id);
  }
}
