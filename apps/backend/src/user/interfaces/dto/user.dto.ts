import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, MinLength, length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The phone number of the user',
    example: '1234567890',
    required: true,
    type: String,
  })
  @IsString()
  phone: string;
}


export class UpdateUserDto {
  @ApiProperty({
    description: 'The phone number of the user',
    example: '1234567890',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  phone: string;
}

export class UserResponseDto {
  @IsUUID()
  userId: string;

  @IsString()
  phone: string;

  createdAt: Date;

  updatedAt: Date;
}

export class VerifyUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'The OTP of the user',
    example: '123456',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  otp: string;
}