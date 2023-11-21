import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700583046769 implements MigrationInterface {
    name = 'SavannatechDb1700583046769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_c5f9b6e085f7aea32acc0a72d1c"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_6c951aa07f427d951fc3c253779"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "cover_letter"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "developer_id"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "developer_id"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "coverLetter" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "years_of_experience"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "years_of_experience" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "background_questions" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "resume"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "resume" text`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "role_status" SET DEFAULT 'External'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-21T16:10:49.241Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-20 15:01:47.618'`);
        await queryRunner.query(`ALTER TABLE "developer" ALTER COLUMN "role_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "resume"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "resume" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" ALTER COLUMN "background_questions" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "years_of_experience"`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "years_of_experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "coverLetter"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "developer_id" integer`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "developer_id" integer`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "cover_letter" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_6c951aa07f427d951fc3c253779" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_c5f9b6e085f7aea32acc0a72d1c" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
