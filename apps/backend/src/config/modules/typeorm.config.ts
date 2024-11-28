import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'labourize-db',
  port: 5432,
  username: 'labourizeuser',
  password: '123456',
  database: 'labourizedb',
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
    entities: [
      `${__dirname}/../**/domain/*.entity{.ts,.js}`,
      `${__dirname}/../**/entities/*.entity{.ts,.js}`,
      `${__dirname}/../**/infrastructure/*.repository{.ts,.js}`
    ],
});
4