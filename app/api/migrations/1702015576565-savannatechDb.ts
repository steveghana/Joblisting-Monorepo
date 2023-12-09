import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1702015576565 implements MigrationInterface {
    name = 'SavannatechDb1702015576565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-08T06:06:20.371Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-08 02:03:56.237'`);
    }

}
