import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1702414682762 implements MigrationInterface {
    name = 'SavannatechDb1702414682762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interviews" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventType" character varying NOT NULL, "eventOption" character varying NOT NULL, "description" character varying NOT NULL, "eventLInk" character varying NOT NULL, "starttime" character varying NOT NULL, "endtime" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "role_id" uuid, "candidateId" uuid, CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "developer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "skills" text NOT NULL, "phone_number" character varying NOT NULL, "salary" integer NOT NULL, "years_of_experience" character varying NOT NULL, "address" character varying NOT NULL, "workStatus" character varying NOT NULL, "role_status" character varying NOT NULL DEFAULT 'External', "user_id" uuid, "client_id" uuid, "role_id" uuid, "candidateInterviewId" uuid, CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interviews_guests_developer" ("interviewsId" uuid NOT NULL, "developerId" uuid NOT NULL, CONSTRAINT "PK_bc1f39ae279bb89343e36b2ec18" PRIMARY KEY ("interviewsId", "developerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4ecb9eab4fdb4fd16f28535af4" ON "interviews_guests_developer" ("interviewsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_897bfe89fd15496d65cefdb84c" ON "interviews_guests_developer" ("developerId") `);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '"2023-12-12T20:58:05.860Z"'`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '"2023-12-12T20:58:05.863Z"'`);
        await queryRunner.query(`ALTER TABLE "shorturl" ADD CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e" UNIQUE ("shortComponent")`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_70cde0df6012d32717e12f34a49" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_9b47fb5a4e06ccb14d20d2f06fd" FOREIGN KEY ("candidateId") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_154dcb5ce1bed0b171602e9111c" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock_hours" ADD CONSTRAINT "FK_3bc429eee03f0c0fd5a6f4cbe8d" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_db2ae4e35aaa411774bd4752fed" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_4a6d7f90d5287b0a7ca15baa0d7" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_e66b91765591e5686aa68228b74" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_d1cf5710bcb968ac3d5177e5985" FOREIGN KEY ("candidateInterviewId") REFERENCES "interviews"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews_guests_developer" ADD CONSTRAINT "FK_4ecb9eab4fdb4fd16f28535af47" FOREIGN KEY ("interviewsId") REFERENCES "interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interviews_guests_developer" ADD CONSTRAINT "FK_897bfe89fd15496d65cefdb84c4" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews_guests_developer" DROP CONSTRAINT "FK_897bfe89fd15496d65cefdb84c4"`);
        await queryRunner.query(`ALTER TABLE "interviews_guests_developer" DROP CONSTRAINT "FK_4ecb9eab4fdb4fd16f28535af47"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_d1cf5710bcb968ac3d5177e5985"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_e66b91765591e5686aa68228b74"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_4a6d7f90d5287b0a7ca15baa0d7"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_db2ae4e35aaa411774bd4752fed"`);
        await queryRunner.query(`ALTER TABLE "clock_hours" DROP CONSTRAINT "FK_3bc429eee03f0c0fd5a6f4cbe8d"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_154dcb5ce1bed0b171602e9111c"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_9b47fb5a4e06ccb14d20d2f06fd"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_70cde0df6012d32717e12f34a49"`);
        await queryRunner.query(`ALTER TABLE "shorturl" DROP CONSTRAINT "UQ_d4fb996cb4d353480a6ce3c310e"`);
        await queryRunner.query(`ALTER TABLE "authToken" ALTER COLUMN "lastUsed" SET DEFAULT '2023-12-12 20:22:05.169'`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "whenToStart" SET DEFAULT '2023-12-12 20:22:05.165'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_897bfe89fd15496d65cefdb84c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ecb9eab4fdb4fd16f28535af4"`);
        await queryRunner.query(`DROP TABLE "interviews_guests_developer"`);
        await queryRunner.query(`DROP TABLE "developer"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
    }

}
