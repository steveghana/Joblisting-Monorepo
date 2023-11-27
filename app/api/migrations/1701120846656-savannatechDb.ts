import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1701120846656 implements MigrationInterface {
    name = 'SavannatechDb1701120846656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_6c951aa07f427d951fc3c253779"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_34144cc0a7a0cbdbfe539b5be9f"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "job_id"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "developer_id"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD "role_id" uuid`);
        await queryRunner.query(`ALTER TABLE "developer" ADD "developer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-11-27T21:34:09.686Z"'`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_52eb1e9bce5a39e82266a9b42aa" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_17fbfc4f408cb281aca692b1145" FOREIGN KEY ("developer_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_17fbfc4f408cb281aca692b1145"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_52eb1e9bce5a39e82266a9b42aa"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-11-27 21:11:21.862'`);
        await queryRunner.query(`ALTER TABLE "developer" DROP COLUMN "developer_id"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "developer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "job_id" uuid`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_34144cc0a7a0cbdbfe539b5be9f" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_6c951aa07f427d951fc3c253779" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
