import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701004211379 implements MigrationInterface {
    name = 'SavannatechDb1701004211379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clock_hours" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clock_hours" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "applications" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-26T13:10:14.319Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-26 10:56:05.707'`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "clock_hours" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "clock_hours" DROP COLUMN "createdAt"`);
    }

}
