import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1694548705014 implements MigrationInterface {
    name = 'QueueintDb1694548705014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-09-12T19:58:28.984Z"'`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "time" SET DEFAULT '"2023-09-12T19:58:29.298Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-09-12T19:58:29.298Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-06-25 21:14:56.603'`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "time" SET DEFAULT '2023-06-25 21:14:56.603'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-06-25 21:14:56.233'`);
    }

}
