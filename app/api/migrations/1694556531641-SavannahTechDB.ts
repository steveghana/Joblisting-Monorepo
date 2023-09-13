import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannahTechDB1694556531641 implements MigrationInterface {
    name = 'SavannahTechDB1694556531641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lockReason"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("email", "id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "credentialToken" DROP CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7"`);
        await queryRunner.query(`ALTER TABLE "authToken" DROP CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-09-12T22:08:54.153Z"'`);
        await queryRunner.query(`ALTER TABLE "credentialToken" ADD CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authToken" ADD CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" DROP CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba"`);
        await queryRunner.query(`ALTER TABLE "credentialToken" DROP CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-06-25 21:14:56.233'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("email", "id")`);
        await queryRunner.query(`ALTER TABLE "authToken" ADD CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "credentialToken" ADD CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lockReason" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fullName" character varying NOT NULL DEFAULT ''`);
    }

}
