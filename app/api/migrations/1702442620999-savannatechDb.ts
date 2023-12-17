import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1702442620999 implements MigrationInterface {
    name = 'SavannatechDb1702442620999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "link_id" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_979652cacdc371c447ee851c5d6" UNIQUE ("link_id")`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '"2023-12-13T04:43:43.913Z"'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-13T04:43:43.923Z"'`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_979652cacdc371c447ee851c5d6" FOREIGN KEY ("link_id") REFERENCES "shorturl"("shortComponent") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_979652cacdc371c447ee851c5d6"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-13 04:27:01.03'`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '2023-12-13 04:27:01.027'`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_979652cacdc371c447ee851c5d6"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "link_id"`);
    }

}
