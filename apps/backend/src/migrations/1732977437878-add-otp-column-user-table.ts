import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpColumnsAndUniquePhoneMigration1732977437878 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD "otp" VARCHAR(6) NOT NULL,
      ADD "last_otp_sent" TIMESTAMP
    `);


    // Make phone column unique
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD CONSTRAINT "UQ_user_phone" UNIQUE ("phone")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert the schema changes (drop columns and constraints)
    await queryRunner.query(`
      ALTER TABLE "user" DROP CONSTRAINT "UQ_user_phone"
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "otp",
      DROP COLUMN "last_otp_sent"
    `);
  }
}
