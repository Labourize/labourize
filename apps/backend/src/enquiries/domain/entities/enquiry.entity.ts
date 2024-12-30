import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('enquiries')
export class Enquiry {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 15, type: 'varchar' })
  phone: string;

  @Column({ length: 255, type: 'varchar' })
  email: string;

  @Column({ length: 255, type: 'varchar' })
  serviceOfInterest: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
