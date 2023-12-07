import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701785862201 implements MigrationInterface {
    name = 'SavannatechDb1701785862201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" ADD "workStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-05T14:17:45.085Z"'`);
        await queryRunner.query(`ALTER TABLE "shorturl" ADD CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e" UNIQUE ("shortComponent")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shorturl" DROP CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-04 05:19:14.511'`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "workStatus"`);
    }

}
