import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import environment from './config/environment';
import { ConfigDatabaseModule } from './config/modules';

@Module({
  imports: [ConfigModule.forRoot({ load: [environment], isGlobal: true, ignoreEnvVars: false }),
    ConfigDatabaseModule
  ],
  controllers: [],
  providers: []
})
export class DBMigrationsModule { }
