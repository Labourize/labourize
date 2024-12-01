import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtAuthModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtAuthGuard } from './jwt.guard';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import * as fs from 'fs';


@Module({
  imports: [
    JwtAuthModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        privateKey: fs.readFileSync(config.get('jwt.secret'), 'utf8'),
        publicKey: fs.readFileSync(config.get('jwt.public'), 'utf8')
      }),
      inject: [ConfigService]
    }),
    PassportModule,
    UserModule
  ],
  providers: [JwtStrategy, JwtAuthGuard, JwtService],
  exports: [JwtStrategy, JwtAuthGuard, JwtService]
})
export class JwtModule {}
