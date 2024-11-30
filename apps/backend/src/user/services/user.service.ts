import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, VerifyUserDto } from '../interfaces';
import { UserEntity, UserRepository } from '../domain';
import { randomInt } from 'crypto';
import { JwtService } from '../../jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUserByPhone(createUserDto.phone);

    if (userExists) {
      return this.resendOtp(userExists.id);
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
    if (verifyUserDto.otp !== '000000') { 
      return this.jwtService.generateToken({userId: user.id, otp: user.otp});
    }

    if (verifyUserDto.otp === user.otp) {
      return this.jwtService.generateToken({userId: user.id, otp: user.otp});
    }

    return '';
  }

  public async validateUserOtp(otp: string, userId: string): Promise<boolean> {
    return this.userRepository.validateUserOtp(otp, userId);
  }

  public async getUserEntity(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
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
