import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700996162526 implements MigrationInterface {
    name = 'SavannatechDb1700996162526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "DevsNeeded"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "testingQA"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "devsNeeded" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "hiringRole" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "roleType" character varying NOT NULL DEFAULT 'Remote'`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "employmentType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-26T10:56:05.707Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-26 10:49:36.837'`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "employmentType"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "roleType"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "hiringRole"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "devsNeeded"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "testingQA" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "DevsNeeded" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "description" character varying NOT NULL`);
    }

}
