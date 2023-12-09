import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1702001033650 implements MigrationInterface {
    name = 'SavannatechDb1702001033650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-08T02:03:56.237Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-07 18:42:45.596'`);
    }

}
