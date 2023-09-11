import { MigrationInterface, QueryRunner } from "typeorm";

export class QueueintDb1685065405214 implements MigrationInterface {
    name = 'QueueintDb1685065405214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_79acff95641ab8fe7769d0b6186"`);
        await queryRunner.query(`ALTER TABLE "advertisement" RENAME COLUMN "cartId" TO "cartItemId"`);
        await queryRunner.query(`CREATE TABLE "cartItem" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "advertisementId" integer, CONSTRAINT "PK_56da2bf3db528f1d91566fd46e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "totalPrice" integer, "qty" integer, "time" TIMESTAMP DEFAULT '"2023-05-26T01:43:28.654Z"', "orderPlaced" boolean NOT NULL DEFAULT false, "completed" boolean NOT NULL DEFAULT false, "queueCustomerId" integer, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-05-26T01:43:28.448Z"'`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '"2023-05-26T01:43:28.654Z"'`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_e7e94587db61441e07dba0629a8" FOREIGN KEY ("cartItemId") REFERENCES "cartItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItem" ADD CONSTRAINT "FK_758a7aa44831ea2e513bb435acd" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cartItem" ADD CONSTRAINT "FK_f7a4c83a1f780f54c23f6830c70" FOREIGN KEY ("advertisementId") REFERENCES "advertisement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_17eff54f8cd14735f14cac5e0b7" FOREIGN KEY ("queueCustomerId") REFERENCES "queueCustomer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_17eff54f8cd14735f14cac5e0b7"`);
        await queryRunner.query(`ALTER TABLE "cartItem" DROP CONSTRAINT "FK_f7a4c83a1f780f54c23f6830c70"`);
        await queryRunner.query(`ALTER TABLE "cartItem" DROP CONSTRAINT "FK_758a7aa44831ea2e513bb435acd"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_e7e94587db61441e07dba0629a8"`);
        await queryRunner.query(`ALTER TABLE "queueCustomer" ALTER COLUMN "joinTime" SET DEFAULT '2023-05-25 23:58:02.629'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-05-25 23:58:02.451'`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cartItem"`);
        await queryRunner.query(`ALTER TABLE "advertisement" RENAME COLUMN "cartItemId" TO "cartId"`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_79acff95641ab8fe7769d0b6186" FOREIGN KEY ("cartId") REFERENCES "cartitem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
