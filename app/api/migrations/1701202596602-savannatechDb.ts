import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701202596602 implements MigrationInterface {
    name = 'SavannatechDb1701202596602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "selectedSkills" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-28T20:16:40.462Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-28 09:09:36.408'`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "selectedSkills"`);
    }

}
