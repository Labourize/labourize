import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserRepository } from './domain';
import { UserService } from './services';
import { UserController } from './user.controller';
import { JwtService } from 'src/jwt/jwt.service';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository, JwtService, JwtAuthGuard],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
