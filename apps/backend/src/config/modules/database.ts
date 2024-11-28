import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('db.host'),
    port: config.get('db.port'),
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.database'),
    synchronize: false,
    logging: process.env.SHOW_DB_QUERY_LOGGER === 'true',
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
    entities: [
      `${__dirname}/../../**/domain/*.entity{.ts,.js}`,
      `${__dirname}/../../**/entities/*.entity{.ts,.js}`,
      `${__dirname}/../../**/infrastructure/*.repository{.ts,.js}`
    ],
    extra: {
      // tslint:disable-next-line: max-line-length
      // based on  https://node-postgres.com/api/pool and https://github.com/typeorm/typeorm/issues/3388#issuecomment-673242516
      // max connection pool size (default - 3 connections)
      max: process.env.DB_MAX_POOL_SIZE || '3',
      // connection timeout
      connectionTimeoutMillis: process.env.DB_MAX_CONNECTION_TIMEOUT || '2000',
      // idle timeout (default - 30s)
      idleTimeoutMillis: process.env.DB_MAX_IDLE_TIMEOUT || '30000'
    }
  }),
  inject: [ConfigService]
});

export const migrationDataSourceOptions = (config): DataSourceOptions => ({
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: false,
  logging: process.env.SHOW_DB_QUERY_LOGGER === 'true',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
  entities: [
    // FIXME: Should be removed after move user.entity.ts to correct position
    `${__dirname}/../../**/domain/*.entity{.ts,.js}`,
    `${__dirname}/../../**/entities/*.entity{.ts,.js}`,
    `${__dirname}/../../**/infrastructure/*.repository{.ts,.js}`
  ],
  extra: {
    // tslint:disable-next-line: max-line-length
    // based on  https://node-postgres.com/api/pool and https://github.com/typeorm/typeorm/issues/3388#issuecomment-673242516
    // max connection pool size (default - 3 connections)
    max: process.env.DB_MAX_POOL_SIZE || '3',
    // connection timeout
    connectionTimeoutMillis: process.env.DB_MAX_CONNECTION_TIMEOUT || '2000',
    // idle timeout (default - 30s)
    idleTimeoutMillis: process.env.DB_MAX_IDLE_TIMEOUT || '30000'
  }
})
