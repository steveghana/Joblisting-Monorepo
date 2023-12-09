import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701974562894 implements MigrationInterface {
    name = 'SavannatechDb1701974562894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-07T18:42:45.596Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-07 17:14:06.511'`);
    }

}
