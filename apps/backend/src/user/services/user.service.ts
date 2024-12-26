import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDeviceIdDto, UserResponseDto, VerifyUserDto } from '../interfaces';
import { UserEntity, UserRepository } from '../domain';
import { randomInt } from 'crypto';
import { JwtService } from '../../jwt/jwt.service';
import { OTPService } from './otp.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly otpService: OTPService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUserByPhone(createUserDto.phone);

    if (userExists) {
      await this.userRepository.resetLoggout(userExists.id);
      if (userExists.deviceId !== createUserDto.deviceId) {
        await this.updateUser(userExists.id, { phone: createUserDto.phone, deviceId: createUserDto.deviceId });
      }
      await this.otpService.publishSmsMessage(userExists.phone, userExists.otp);
      return this.resendOtp(userExists.id);
    }
    const user = await this.userRepository.createUser(createUserDto.phone, createUserDto.deviceId);
    await this.otpService.publishSmsMessage(user.phone, user.otp);
    return this.toUserResponseDto(user);
  }

  public async checkUserByDeviceId(deviceIdDto: UserDeviceIdDto): Promise<UserResponseDto | string> {
    const user = await this.userRepository.findUserByDeviceId(deviceIdDto.deviceId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponseDto(user);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map(user => this.toUserResponseDto(user));
  }

  async findUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toUserResponseDto(user);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(userId, updateUserDto.phone);
    return this.toUserResponseDto(updatedUser);
  }

  async resendOtp(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.resendOtp(userId);
    return this.toUserResponseDto(user);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<string> {
    const user = await this.userRepository.findUserByPhone(verifyUserDto.phone);
    if (!user) {
      throw new Error('User not found');
    }

    // TODO: Note  this is only for testing purpose, need to remove of update on env
    if (verifyUserDto.otp === '000000') {
      await this.userRepository.resetLoggout(user.id);
      return await this.jwtService.generateToken({userId: user.id, otp: user.otp});
    }

    if (verifyUserDto.otp === user.otp) {
      await this.userRepository.resetLoggout(user.id);
      return await this.jwtService.generateToken({userId: user.id, otp: user.otp});
    }

    return '';
  }

  public async validateUserOtp(otp: string, userId: string): Promise<boolean> {
    
    // TODO: Note  this is only for testing purpose, need to remove of update on env
    if (otp === '000000') {
      return true;
    }
    return this.userRepository.validateUserOtp(otp, userId);
  }

  public async getUserEntity(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async userLogout(userId: string): Promise<string> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.patchUserLoggedOut(userId);
      return 'Logged out successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private toUserResponseDto(user: UserEntity): UserResponseDto {    
    return {
      userId: user.id,
      phone: user.phone,
      deviceId: user.deviceId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isLoggedOut: +user?.loggedOut != 0
    };
  }
}
