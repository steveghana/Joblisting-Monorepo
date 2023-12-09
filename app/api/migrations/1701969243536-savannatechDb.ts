import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701969243536 implements MigrationInterface {
    name = 'SavannatechDb1701969243536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-07T17:14:06.511Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-05 14:17:45.085'`);
    }

}
