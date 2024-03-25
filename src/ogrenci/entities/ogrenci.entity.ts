import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int' })
  deptid: number;

  @Column({ type: 'int' })
  counter: number;
}