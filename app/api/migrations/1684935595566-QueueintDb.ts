import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1684935595566 implements MigrationInterface {
    name = 'QueueintDb1684935595566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartitem" ADD "qty" integer`);
        await queryRunner.query(`ALTER TABLE "cartitem" ADD "time" TIMESTAMP DEFAULT '"2023-05-24T13:39:59.868Z"'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-24T13:39:59.616Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-24T13:39:59.868Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-23 15:57:47.911'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-23 15:57:47.665'`);
        await queryRunner.query(`ALTER TABLE "cartitem" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "cartitem" DROP COLUMN "qty"`);
    }

}
