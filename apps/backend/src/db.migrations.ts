import { NestFactory } from '@nestjs/core';
import { DBMigrationsModule } from './db.migrations.module';
// import DataSource from './config/modules/typeorm.config';
import { ConfigService } from '@nestjs/config';
import { DataSource, getConnection } from 'typeorm';
import { migrationDataSourceOptions } from './config/modules/database';


async function bootstrap() {
  try {
    const app = await NestFactory.create(DBMigrationsModule);

    const config = app.get(ConfigService);    

    const connection = new DataSource(migrationDataSourceOptions(config));

    // const connection = getConnection();    
    await connection.initialize();

    await connection.runMigrations({
      transaction: 'none'
    });

    await connection.destroy();

    // Implement graceful disconnect(s) here
    // eslint-disable-next-line no-inner-declarations
    function gracefulExit() {
      return (async () => {
        try {
          await connection.destroy();
          // EXAMPLE: dbProvider.closeConnections().then(process.exit));
          // logger.info('HUB API Service stopped');
        } catch (error) {
          // logger.error('Some services were not stopped gracefuly', {}, error);
        } finally {
          process.exit();
        }
      })();
    }

    // Adding process handlers to execute graceful_exit function
    process.on('SIGINT', () => {
      console.log("4");
      void gracefulExit();
    });
    process.on('SIGTERM', () => {
      console.log("5");
      void gracefulExit();
    });
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // logger.error(error.message, {}, error);
  }
}
void bootstrap();

process.on('unhandledRejection', (error: Error) => {
  // logger.error(error.message, {}, error);
});
