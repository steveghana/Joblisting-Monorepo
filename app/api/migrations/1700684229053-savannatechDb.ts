import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700684229053 implements MigrationInterface {
    name = 'SavannatechDb1700684229053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "developer_id" integer`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "years_of_experience"`);
        await queryRunner.query(`ALTER TABLE "developer" ADD "years_of_experience" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-22T20:17:11.462Z"'`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_6c951aa07f427d951fc3c253779" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_6c951aa07f427d951fc3c253779"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-21 16:10:49.241'`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "years_of_experience"`);
        await queryRunner.query(`ALTER TABLE "developer" ADD "years_of_experience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "developer_id"`);
    }

}
