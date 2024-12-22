import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLoggedOutColumnsAndUniquePhoneMigration1734857754405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "logged_out" bigint NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the schema changes (drop columns and constraints)
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "logged_out"
    `);
  }
}
