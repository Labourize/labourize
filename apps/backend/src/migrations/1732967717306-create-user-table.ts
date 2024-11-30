import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1732967717306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "phone" character varying NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'::text, now()),
      "updated_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'::text, now()),
      CONSTRAINT "user_id_pk" PRIMARY KEY ("id")
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SELECT 1;');
  }
}
