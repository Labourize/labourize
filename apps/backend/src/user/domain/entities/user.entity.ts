import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, unique: true, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  otp: string;

  @Column({ type: 'timestamp', nullable: true })
  lastOtpSent: Date; // Timestamp of when the last OTP was sent

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
