import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OgrenciSayac {
    @PrimaryColumn({ type: 'int', default: 0 })
    sayac: number;
}

