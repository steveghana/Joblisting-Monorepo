import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1683728588092 implements MigrationInterface {
    name = 'QueueintDb1683728588092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "addType" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-10T14:23:12.790Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-10T14:23:13.017Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-05 18:59:58.225'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-05 18:59:58.082'`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "addType"`);
    }

}
