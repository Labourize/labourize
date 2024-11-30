import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, VerifyUserDto } from '../interfaces';
import { UserRepository } from '../domain';
import { randomInt } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUserByPhone(createUserDto.phone);
    
    if (userExists) {
      await this.updateUser(userExists.id, { phone: createUserDto.phone });
    }
    const user = await this.userRepository.createUser(createUserDto.phone);
    return this.toUserResponseDto(user);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map(user => this.toUserResponseDto(user));
  }

  async findUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.toUserResponseDto(user);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(userId, updateUserDto.phone);
    return this.toUserResponseDto(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findUserByPhone(verifyUserDto.phone);
    if (!user) {
      throw new Error('User not found');
    }

    // TODO: Note  this is only for testing purpose, need to remove of update on env
    if (verifyUserDto.otp !== '000000') { 
      return this.toUserResponseDto(user);
    }

    if (verifyUserDto.otp === user.otp) {
      return this.toUserResponseDto(user);
    }

    return this.toUserResponseDto(user);
  }

  private toUserResponseDto(user: any): UserResponseDto {
    return {
      userId: user.id,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
