import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1702016116954 implements MigrationInterface {
    name = 'SavannatechDb1702016116954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-08T06:15:19.653Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-08 06:06:20.371'`);
    }

}
