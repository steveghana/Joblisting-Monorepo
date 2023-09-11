import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1684694495980 implements MigrationInterface {
    name = 'QueueintDb1684694495980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cartitem" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "totalPrice" integer, "orderPlaced" boolean NOT NULL DEFAULT false, "queueCustomerId" integer NOT NULL, CONSTRAINT "PK_b258f969a3be8a9a76c99153925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD "cartId" integer`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-21T18:41:39.753Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-21T18:41:39.985Z"'`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_79acff95641ab8fe7769d0b6186" FOREIGN KEY ("cartId") REFERENCES "cartitem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartitem" ADD CONSTRAINT "FK_2de97b2944861cbd32db91e794e" FOREIGN KEY ("queueCustomerId") REFERENCES "queueCustomer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cartitem" DROP CONSTRAINT "FK_2de97b2944861cbd32db91e794e"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_79acff95641ab8fe7769d0b6186"`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-14 14:28:03.233'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-14 14:28:03.066'`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP COLUMN "cartId"`);
        await queryRunner.query(`DROP TABLE "cartitem"`);
    }

}
