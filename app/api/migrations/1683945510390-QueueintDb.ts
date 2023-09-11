import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1683945510390 implements MigrationInterface {
    name = 'QueueintDb1683945510390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-13T02:38:34.564Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-13T02:38:34.747Z"'`);
        await queryRunner.query(`ALTER TABLE "queueArea" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "queueArea" ADD "name" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queueArea" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "queueArea" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-12 15:23:33.5'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-12 15:23:33.311'`);
    }

}
