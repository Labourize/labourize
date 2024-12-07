import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpColumnsAndUniquePhoneMigration1733574422364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "device_id" character varying NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the schema changes (drop columns and constraints)
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "device_id"
    `);
  }
}
