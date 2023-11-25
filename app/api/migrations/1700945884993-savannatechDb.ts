import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700945884993 implements MigrationInterface {
    name = 'SavannatechDb1700945884993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shorturl" ("shortComponent" character varying NOT NULL, "longComponent" character varying NOT NULL, "expirationDate" TIMESTAMP, CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e" UNIQUE ("shortComponent"), CONSTRAINT "PK_d4fb996cb4d353480a6ce3c310e" PRIMARY KEY ("shortComponent"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "companyLogo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "aboutTheCompany" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "country" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "aboutTheProject" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-25T20:58:07.585Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-23 12:49:33.043'`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "aboutTheProject"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "aboutTheCompany"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "companyLogo"`);
        await queryRunner.query(`DROP TABLE "shorturl"`);
    }

}
