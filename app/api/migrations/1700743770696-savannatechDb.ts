import { MigrationInterface, QueryRunner } from "typeorm";

export class SavannatechDb1700743770696 implements MigrationInterface {
    name = 'SavannatechDb1700743770696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "credentialToken" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userEmail" character varying, CONSTRAINT "UQ_2a084410d847ef16323a2f500fe" UNIQUE ("uuid"), CONSTRAINT "PK_3df76481d610656845be1b220b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clock_hours" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "hours_worked" integer NOT NULL, "developer_id" integer, CONSTRAINT "PK_c2cca5b5bca39b4ddba79d80195" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "years_of_experience" character varying NOT NULL, "address" character varying NOT NULL, "background_questions" text, "resume" text, "coverLetter" character varying NOT NULL, "status" character varying NOT NULL, "role_id" integer, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "industry" text NOT NULL, "avatar" character varying, "communicationPreferences" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "companyName" character varying NOT NULL, "email" character varying NOT NULL, "numOfEmployees" character varying NOT NULL, "projectTitle" character varying NOT NULL, "startDate" TIMESTAMP, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "durationForEmployment" character varying NOT NULL, "DevsNeeded" character varying NOT NULL, "methodology" character varying NOT NULL, "experience" character varying NOT NULL, "testingQA" character varying NOT NULL, "whenToStart" character varying NOT NULL, "dataContent" character varying NOT NULL, "numOfEmployees" character varying NOT NULL, "skills_required" text NOT NULL, "vacancy_status" character varying NOT NULL, "client_id" integer, "developer_id" integer, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interviews" ("id" SERIAL NOT NULL, "scheduled_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "role_id" integer, "interviewer_id" integer, "interviewee_id" integer, CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "developer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "skills" text NOT NULL, "phone_number" character varying NOT NULL, "years_of_experience" character varying NOT NULL, "address" character varying NOT NULL, "role_status" character varying NOT NULL DEFAULT 'External', "user_id" uuid, CONSTRAINT "PK_71b846918f80786eed6bfb68b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "developerId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_21205fa560f3b59c5b1acfa222" UNIQUE ("developerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authToken" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "lastUsed" TIMESTAMP NOT NULL DEFAULT '"2023-11-23T12:49:33.043Z"', "credentialTokenId" integer, "userEmail" character varying, CONSTRAINT "PK_eb8fa60b49ec49031fa0cab6d3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "credentialToken" ADD CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock_hours" ADD CONSTRAINT "FK_3bc429eee03f0c0fd5a6f4cbe8d" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_0765275891b64a32533bf3e30e3" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_d0b5383e5f33fe2457f497e24c3" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_6c951aa07f427d951fc3c253779" FOREIGN KEY ("developer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_70cde0df6012d32717e12f34a49" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_dab087b7d082364ae58637eafbb" FOREIGN KEY ("interviewer_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interviews" ADD CONSTRAINT "FK_9949c3e824ed03022b847fae3d6" FOREIGN KEY ("interviewee_id") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "developer" ADD CONSTRAINT "FK_db2ae4e35aaa411774bd4752fed" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_21205fa560f3b59c5b1acfa2226" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authToken" ADD CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba" FOREIGN KEY ("userEmail") REFERENCES "user"("email") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "authToken" ADD CONSTRAINT "FK_af81ec9611dce9d566ee9f5ec3a" FOREIGN KEY ("credentialTokenId") REFERENCES "credentialToken"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authToken" DROP CONSTRAINT "FK_af81ec9611dce9d566ee9f5ec3a"`);
        await queryRunner.query(`ALTER TABLE "authToken" DROP CONSTRAINT "FK_d1adaf94c83cb8593f6d744c1ba"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_21205fa560f3b59c5b1acfa2226"`);
        await queryRunner.query(`ALTER TABLE "developer" DROP CONSTRAINT "FK_db2ae4e35aaa411774bd4752fed"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_9949c3e824ed03022b847fae3d6"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_dab087b7d082364ae58637eafbb"`);
        await queryRunner.query(`ALTER TABLE "interviews" DROP CONSTRAINT "FK_70cde0df6012d32717e12f34a49"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_6c951aa07f427d951fc3c253779"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_d0b5383e5f33fe2457f497e24c3"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_0765275891b64a32533bf3e30e3"`);
        await queryRunner.query(`ALTER TABLE "clock_hours" DROP CONSTRAINT "FK_3bc429eee03f0c0fd5a6f4cbe8d"`);
        await queryRunner.query(`ALTER TABLE "credentialToken" DROP CONSTRAINT "FK_fa3b591a5406eb5ee83158a83c7"`);
        await queryRunner.query(`DROP TABLE "authToken"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "developer"`);
        await queryRunner.query(`DROP TABLE "interviews"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TABLE "clock_hours"`);
        await queryRunner.query(`DROP TABLE "credentialToken"`);
    }

}
