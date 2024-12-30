import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEnquiriesTable1735566895418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "enquiries" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "name" character varying(255) NOT NULL,
      "phone" character varying(10) NOT NULL,
      "email" character varying(255) NOT NULL,
      "service_of_interest" character varying(255) NOT NULL,
      "message" text NOT NULL,
      "created_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'::text, now()),
      "updated_at" TIMESTAMP NOT NULL DEFAULT timezone('UTC'::text, now()),
      CONSTRAINT "enquiries_id_pk" PRIMARY KEY ("id")
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE enquiries
    `);
  }
}
