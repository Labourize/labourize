import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from './domain';
import { UserService } from './services';
import { UserController } from './user.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';
import { OTPService } from './services/otp.service';
import { TwilioProvider } from './providers/twilio.provider';
import { AWSProvider } from './providers/aws.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, JwtService, JwtAuthGuard, OTPService, TwilioProvider, AWSProvider],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
