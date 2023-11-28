import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701162571971 implements MigrationInterface {
    name = 'SavannatechDb1701162571971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-28T09:09:36.408Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-27 21:34:09.686'`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "country"`);
    }

}
