import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1707523450958 implements MigrationInterface {
    name = 'InitMigration1707523450958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_mf_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ab8e029c9f129a7e7e9a83748c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "uniqueUserName" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_benefit_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_dbf39d72d6f0fccc1f66821f3e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_benefit" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "datePayed" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "employeeBenefitTypeId" integer, CONSTRAINT "PK_dd51baed15199c2fdd78c8ef5ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wage" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "datePayed" TIMESTAMP NOT NULL, "amount" integer NOT NULL, CONSTRAINT "PK_b3f28210febc85e4c371e6569e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "income_report" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "forMonth" character varying NOT NULL, "forYear" character varying NOT NULL, CONSTRAINT "PK_e06bd728f480f95876d4add8d23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "other_income" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "datePayed" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "amount" integer NOT NULL, "incomeReportId" integer, CONSTRAINT "PK_a8b37f71beef4aba70fab735b35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utility_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" integer NOT NULL, "expenseReportId" integer, CONSTRAINT "PK_56ea533f3bb55b841176a152571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utility" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "typeId" integer, "expenseReportId" integer, CONSTRAINT "PK_a231216e3ba8155f6b027f8d731" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bankName" character varying NOT NULL, "accountType" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_end_of_month_statement" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "isPayed" boolean NOT NULL, "bankId" integer, "expenseReportId" integer, CONSTRAINT "PK_41ec96326cccd9e7d554d65e4c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_report" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "forMonth" character varying NOT NULL, "forYear" character varying NOT NULL, CONSTRAINT "PK_0a85619cfdd593954781a8bce46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rent" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "rentor" character varying NOT NULL, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD CONSTRAINT "FK_490d0f84acfb0e7cda628b167ee" FOREIGN KEY ("employeeBenefitTypeId") REFERENCES "employee_benefit_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "other_income" ADD CONSTRAINT "FK_70afacb32e3de9e8d7fa00dec62" FOREIGN KEY ("incomeReportId") REFERENCES "income_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility_type" ADD CONSTRAINT "FK_b314710f6179d1ccf4d47cf28e4" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility" ADD CONSTRAINT "FK_e36622c949378a161cffe683bd5" FOREIGN KEY ("typeId") REFERENCES "utility_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility" ADD CONSTRAINT "FK_3b0d75b641577e48e0212811f06" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_end_of_month_statement" ADD CONSTRAINT "FK_fdb8c2f4fea4bdbc1ac3d9af1cd" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_end_of_month_statement" ADD CONSTRAINT "FK_dc61542eeca056d617e35c36dab" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_end_of_month_statement" DROP CONSTRAINT "FK_dc61542eeca056d617e35c36dab"`);
        await queryRunner.query(`ALTER TABLE "bank_end_of_month_statement" DROP CONSTRAINT "FK_fdb8c2f4fea4bdbc1ac3d9af1cd"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP CONSTRAINT "FK_3b0d75b641577e48e0212811f06"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP CONSTRAINT "FK_e36622c949378a161cffe683bd5"`);
        await queryRunner.query(`ALTER TABLE "utility_type" DROP CONSTRAINT "FK_b314710f6179d1ccf4d47cf28e4"`);
        await queryRunner.query(`ALTER TABLE "other_income" DROP CONSTRAINT "FK_70afacb32e3de9e8d7fa00dec62"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP CONSTRAINT "FK_490d0f84acfb0e7cda628b167ee"`);
        await queryRunner.query(`DROP TABLE "rent"`);
        await queryRunner.query(`DROP TABLE "expense_report"`);
        await queryRunner.query(`DROP TABLE "bank_end_of_month_statement"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`DROP TABLE "utility"`);
        await queryRunner.query(`DROP TABLE "utility_type"`);
        await queryRunner.query(`DROP TABLE "other_income"`);
        await queryRunner.query(`DROP TABLE "income_report"`);
        await queryRunner.query(`DROP TABLE "wage"`);
        await queryRunner.query(`DROP TABLE "employee_benefit"`);
        await queryRunner.query(`DROP TABLE "employee_benefit_type"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "base_mf_entity"`);
    }

}
