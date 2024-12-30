import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateEnquiryDto {
  @ApiProperty({ description: 'Name of the user', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Phone number of the user', maxLength: 10 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  phone: string;

  @ApiProperty({ description: 'Email of the user', maxLength: 255 })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ description: 'Service of interest', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  serviceOfInterest: string;

  @ApiProperty({ description: 'Message or enquiry details' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
