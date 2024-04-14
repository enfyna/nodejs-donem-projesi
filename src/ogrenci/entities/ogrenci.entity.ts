import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bolum } from '../../bolum/entities/bolum.entity';
import { OgrenciSayac } from '../../ogrenci-sayac/entities/ogrenci-sayac.entity';

@Entity()
export class Ogrenci {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @OneToOne(() => Bolum, { cascade: true })
  @JoinColumn()
  dept: Bolum;

  @OneToOne(() => OgrenciSayac, { cascade: true })
  @JoinColumn()
  sayac: OgrenciSayac;
}
