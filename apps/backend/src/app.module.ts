import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import { ConfigDatabaseModule } from './config/modules';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ environment ]}),
    ConfigDatabaseModule,
    UserModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
