import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724220249232 implements MigrationInterface {
    name = 'Initial1724220249232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "plan" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "person_plan" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "planId" integer,
                "personCpf" character varying,
                CONSTRAINT "PK_eaeeb5180da6e43c2a32dcf043f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "plan_person_uq" ON "person_plan" ("planId", "personCpf")
        `);
        await queryRunner.query(`
            CREATE TABLE "doctor_specialty" (
                "id" SERIAL NOT NULL,
                "price" numeric(4, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "specialtyId" integer,
                "doctor_cpf" character varying,
                CONSTRAINT "PK_bb2b1ec7556ecdf92c8b6cc8cf7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "specialty_doctor_uq" ON "doctor_specialty" ("specialtyId", "doctor_cpf")
        `);
        await queryRunner.query(`
            CREATE TABLE "specialty" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "pendingApproval" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_9cf4ae334dc4a1ab1e08956460e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."appointment_showstatus_enum" AS ENUM('0', '1', '2', '3')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."appointment_paystatus_enum" AS ENUM('0', '1')
        `);
        await queryRunner.query(`
            CREATE TABLE "appointment" (
                "id" SERIAL NOT NULL,
                "appointment_date" TIMESTAMP NOT NULL,
                "showStatus" "public"."appointment_showstatus_enum" NOT NULL DEFAULT '0',
                "payStatus" "public"."appointment_paystatus_enum" NOT NULL DEFAULT '0',
                "price" numeric(4, 2) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "doctor_cpf" character varying,
                "person_cpf" character varying,
                "doctor_specialty" integer,
                "placeId" integer,
                CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."person_gender_enum" AS ENUM('0', '1', '2')
        `);
        await queryRunner.query(`
            CREATE TABLE "person" (
                "cpf" character varying NOT NULL,
                "name" character varying NOT NULL,
                "birthDate" TIMESTAMP NOT NULL,
                "gender" "public"."person_gender_enum" NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "rootPersonCpf" character varying,
                CONSTRAINT "PK_264b7cad2330569e0ef5b4c39c4" PRIMARY KEY ("cpf")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "doctor_plan" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "planId" integer,
                "doctor_cpf" character varying,
                CONSTRAINT "PK_211fbdd7468be763a4c3060dcf2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "plan_doctor_uq" ON "doctor_plan" ("planId", "doctor_cpf")
        `);
        await queryRunner.query(`
            CREATE TABLE "doctor" (
                "personCpf" character varying NOT NULL,
                "crm" character varying NOT NULL,
                "pendingApproval" boolean NOT NULL DEFAULT true,
                "acceptingAppointment" boolean NOT NULL DEFAULT true,
                "canAcceptAppointment" boolean NOT NULL DEFAULT true,
                "hide" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "workplaceId" integer,
                CONSTRAINT "UQ_aab8f24bc311f018cf511577ac6" UNIQUE ("crm"),
                CONSTRAINT "PK_09a39f5d62bf4a10049e2721e84" PRIMARY KEY ("personCpf")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "workplace" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "pendingApproval" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "suggesterPersonCpf" character varying,
                CONSTRAINT "PK_6b3ebbc93488c046c36b434c7e5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "person_plan"
            ADD CONSTRAINT "FK_6e56aa162fb1e9771bcc2a3555f" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "person_plan"
            ADD CONSTRAINT "FK_acbb2dc57baba4b85c89a6a976f" FOREIGN KEY ("personCpf") REFERENCES "person"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_specialty"
            ADD CONSTRAINT "FK_47c018c9c7031396cbcee31da85" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_specialty"
            ADD CONSTRAINT "FK_6429d9a1458d4ebb5a06b803f93" FOREIGN KEY ("doctor_cpf") REFERENCES "doctor"("personCpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment"
            ADD CONSTRAINT "FK_8c61c5880c3264d94adf1105db9" FOREIGN KEY ("doctor_cpf") REFERENCES "doctor"("personCpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment"
            ADD CONSTRAINT "FK_81a8275b017c98413898b8770a8" FOREIGN KEY ("person_cpf") REFERENCES "person"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment"
            ADD CONSTRAINT "FK_a74c99434f8773c0d7dc3a0a54d" FOREIGN KEY ("doctor_specialty") REFERENCES "specialty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment"
            ADD CONSTRAINT "FK_5d7ff5f4cb5f1839814238eb3bd" FOREIGN KEY ("placeId") REFERENCES "workplace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "person"
            ADD CONSTRAINT "FK_75125f840ec9be27ae50f279fec" FOREIGN KEY ("rootPersonCpf") REFERENCES "person"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_plan"
            ADD CONSTRAINT "FK_f2c385bbb9c7a53050fc4ec83ba" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_plan"
            ADD CONSTRAINT "FK_5cb4e7ababa28ebe99a779d3036" FOREIGN KEY ("doctor_cpf") REFERENCES "doctor"("personCpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor"
            ADD CONSTRAINT "FK_09a39f5d62bf4a10049e2721e84" FOREIGN KEY ("personCpf") REFERENCES "person"("cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor"
            ADD CONSTRAINT "FK_90af58d82e384c79e19df96d0e2" FOREIGN KEY ("workplaceId") REFERENCES "workplace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "workplace"
            ADD CONSTRAINT "FK_2cb3e8d53da2ed4af53277c2311" FOREIGN KEY ("suggesterPersonCpf") REFERENCES "doctor"("personCpf") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "workplace" DROP CONSTRAINT "FK_2cb3e8d53da2ed4af53277c2311"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor" DROP CONSTRAINT "FK_90af58d82e384c79e19df96d0e2"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor" DROP CONSTRAINT "FK_09a39f5d62bf4a10049e2721e84"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_plan" DROP CONSTRAINT "FK_5cb4e7ababa28ebe99a779d3036"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_plan" DROP CONSTRAINT "FK_f2c385bbb9c7a53050fc4ec83ba"
        `);
        await queryRunner.query(`
            ALTER TABLE "person" DROP CONSTRAINT "FK_75125f840ec9be27ae50f279fec"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment" DROP CONSTRAINT "FK_5d7ff5f4cb5f1839814238eb3bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment" DROP CONSTRAINT "FK_a74c99434f8773c0d7dc3a0a54d"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment" DROP CONSTRAINT "FK_81a8275b017c98413898b8770a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "appointment" DROP CONSTRAINT "FK_8c61c5880c3264d94adf1105db9"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_6429d9a1458d4ebb5a06b803f93"
        `);
        await queryRunner.query(`
            ALTER TABLE "doctor_specialty" DROP CONSTRAINT "FK_47c018c9c7031396cbcee31da85"
        `);
        await queryRunner.query(`
            ALTER TABLE "person_plan" DROP CONSTRAINT "FK_acbb2dc57baba4b85c89a6a976f"
        `);
        await queryRunner.query(`
            ALTER TABLE "person_plan" DROP CONSTRAINT "FK_6e56aa162fb1e9771bcc2a3555f"
        `);
        await queryRunner.query(`
            DROP TABLE "workplace"
        `);
        await queryRunner.query(`
            DROP TABLE "doctor"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."plan_doctor_uq"
        `);
        await queryRunner.query(`
            DROP TABLE "doctor_plan"
        `);
        await queryRunner.query(`
            DROP TABLE "person"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."person_gender_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "appointment"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."appointment_paystatus_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."appointment_showstatus_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "specialty"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."specialty_doctor_uq"
        `);
        await queryRunner.query(`
            DROP TABLE "doctor_specialty"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."plan_person_uq"
        `);
        await queryRunner.query(`
            DROP TABLE "person_plan"
        `);
        await queryRunner.query(`
            DROP TABLE "plan"
        `);
    }

}
