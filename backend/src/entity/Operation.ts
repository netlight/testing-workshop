import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  address: string;

  @Column('text')
  description: string;

  @Column('boolean')
  isAcknowledged: boolean;
}
