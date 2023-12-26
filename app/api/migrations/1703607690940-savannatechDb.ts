import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1703607690940 implements MigrationInterface {
    name = 'SavannatechDb1703607690940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "roleApplyiingFor" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '"2023-12-26T16:21:34.353Z"'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-26T16:21:34.362Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-26 13:43:53.567'`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '2023-12-26 13:43:53.558'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "roleApplyiingFor"`);
    }

}
