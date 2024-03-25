import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bolum {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}