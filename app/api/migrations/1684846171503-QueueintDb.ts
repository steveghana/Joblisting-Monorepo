import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1684846171503 implements MigrationInterface {
    name = 'QueueintDb1684846171503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartitem" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-23T12:49:35.037Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-23T12:49:35.318Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-22 08:48:12.512'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-22 08:48:12.312'`);
        await queryRunner.query(`ALTER TABLE "cartitem" DROP COLUMN "completed"`);
    }

}
