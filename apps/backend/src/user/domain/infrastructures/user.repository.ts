import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}


  async createUser(phone: string): Promise<UserEntity> {
    const UserEntity = this.repository.create({ phone });
    return this.repository.save(UserEntity);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findUserById(userId: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { id: userId } });
  }

  async findUserByPhone(phone: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { phone } });
  }

  async updateUser(UserEntityId: string, phone: string): Promise<UserEntity> {
    const UserEntity = await this.findUserById(UserEntityId);
    if (!UserEntity) {
      throw new Error('UserEntity not found');
    }
    UserEntity.phone = phone;
    return this.repository.save(UserEntity);
  }

  async deleteUser(UserEntityId: string): Promise<void> {
    const UserEntity = await this.findUserById(UserEntityId);
    if (!UserEntity) {
      throw new Error('UserEntity not found');
    }
    await this.repository.remove(UserEntity);
  }
}
