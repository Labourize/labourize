import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

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

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2024-01-01T12:00:00Z',
    type: String,
    required: false,
  })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2024-01-01T12:00:00Z',
    type: String,
    required: false,
  })
  @IsOptional()
  updatedAt?: string;
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
