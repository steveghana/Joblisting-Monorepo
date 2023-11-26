import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700995773085 implements MigrationInterface {
    name = 'SavannatechDb1700995773085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-26T10:49:36.837Z"'`);
        await queryRunner.query(`ALTER TABLE "shorturl" ADD CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e" UNIQUE ("shortComponent")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shorturl" DROP CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-25 20:58:07.585'`);
    }

}
