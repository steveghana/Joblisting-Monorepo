import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1703771058591 implements MigrationInterface {
    name = 'SavannatechDb1703771058591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" RENAME COLUMN "roleApplyiingFor" TO "roleApplyingFor"`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '"2023-12-28T13:44:21.509Z"'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-28T13:44:21.548Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-28 13:21:38.757'`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '2023-12-28 13:21:38.714'`);
        await queryRunner.query(`ALTER TABLE "applications" RENAME COLUMN "roleApplyingFor" TO "roleApplyiingFor"`);
    }

}
