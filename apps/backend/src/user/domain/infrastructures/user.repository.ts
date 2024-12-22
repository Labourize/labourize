import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}


  async createUser(phone: string, deviceId: string): Promise<UserEntity> {
    const UserEntity = this.repository.create({ 
      phone,
      deviceId,
      otp: this.generateOTP(),
      lastOtpSent: new Date()
    });
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

  async resendOtp(UserEntityId: string): Promise<UserEntity> {
    await this.repository.update(UserEntityId, { lastOtpSent: new Date(), otp: this.generateOTP() });
    return this.findUserById(UserEntityId);
  }

  public async findUserByDeviceId(deviceId: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { deviceId } });
  }

  public async validateUserOtp(userId: string, otp: string): Promise<boolean> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return user.otp === otp;
  }

  public async patchUserLoggedOut(userId: string): Promise<void> {
    await this.repository.update(userId, { loggedOut: Math.floor(new Date().valueOf() / 1000) })
  }

  public async resetLoggout(userId) {
    await this.repository.update(userId, { loggedOut: 0 });
  }

  private generateOTP(): string {
    return (randomInt(100000, 999999)).toString();
  }
}
