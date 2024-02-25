import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1708828242492 implements MigrationInterface {
    name = 'InitMigration1708828242492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_benefit_type" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_dbf39d72d6f0fccc1f66821f3e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee_benefit" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "datePayed" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "userId" uuid, "employeeBenefitTypeId" integer, "incomeReportId" integer, CONSTRAINT "PK_dd51baed15199c2fdd78c8ef5ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "other_income" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "datePayed" TIMESTAMP NOT NULL, "type" character varying NOT NULL, "amount" integer NOT NULL, "userId" uuid, "incomeReportId" integer, CONSTRAINT "PK_a8b37f71beef4aba70fab735b35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "income_report" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "forMonth" character varying NOT NULL, "forYear" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "IncomeReport_MonthAndYear" UNIQUE ("forMonth", "forYear", "userId"), CONSTRAINT "PK_e06bd728f480f95876d4add8d23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paycheck" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "datePayed" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "userId" uuid, "incomeReportId" integer, CONSTRAINT "PK_a20d2179dd207821bf5ebeb9dd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utility_type" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_56ea533f3bb55b841176a152571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "utility" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "amount" integer NOT NULL, "userId" uuid, "typeId" integer, "expenseReportId" integer, CONSTRAINT "PK_a231216e3ba8155f6b027f8d731" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "bankName" character varying NOT NULL, "accountType" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card_end_of_month_statement" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "amount" integer NOT NULL, "isPayed" boolean NOT NULL, "userId" uuid, "bankId" integer, "expenseReportId" integer, CONSTRAINT "PK_5770891c4f4b4f4c0345cb0fc3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_report" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "forMonth" character varying NOT NULL, "forYear" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "ExpenseReport_MonthAndYear" UNIQUE ("forMonth", "forYear", "userId"), CONSTRAINT "PK_0a85619cfdd593954781a8bce46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rent" ("id" SERIAL NOT NULL, "deletedAt" TIMESTAMP, "rentAmount" integer NOT NULL, "rentor" character varying NOT NULL, "userId" uuid, "expenseReportId" integer, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" ADD CONSTRAINT "FK_f4665f8ca0dda529038f23374ce" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD CONSTRAINT "FK_51e792de8d79851b696499b9f3f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD CONSTRAINT "FK_490d0f84acfb0e7cda628b167ee" FOREIGN KEY ("employeeBenefitTypeId") REFERENCES "employee_benefit_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD CONSTRAINT "FK_420900c979f7f447e32e99ac39d" FOREIGN KEY ("incomeReportId") REFERENCES "income_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "other_income" ADD CONSTRAINT "FK_a15f89f13c697538be7c875b0d8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "other_income" ADD CONSTRAINT "FK_70afacb32e3de9e8d7fa00dec62" FOREIGN KEY ("incomeReportId") REFERENCES "income_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "income_report" ADD CONSTRAINT "FK_62e3ce599b052e05d25808a9159" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paycheck" ADD CONSTRAINT "FK_e228bb7fead660bc696781fbe63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paycheck" ADD CONSTRAINT "FK_761037f07e910d787b6925303d7" FOREIGN KEY ("incomeReportId") REFERENCES "income_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility_type" ADD CONSTRAINT "FK_e7f5ff163f99b9e2aab74310208" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility" ADD CONSTRAINT "FK_2a52f200ad97de1d4c77db09819" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility" ADD CONSTRAINT "FK_e36622c949378a161cffe683bd5" FOREIGN KEY ("typeId") REFERENCES "utility_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "utility" ADD CONSTRAINT "FK_3b0d75b641577e48e0212811f06" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank" ADD CONSTRAINT "FK_f023abe054fcf7b1d67cd4c8a13" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" ADD CONSTRAINT "FK_e257abe4a8cc7b61e0537dd538a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" ADD CONSTRAINT "FK_8d799176e3fc8cd28b933421a1b" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" ADD CONSTRAINT "FK_fd81184a6190944db3f977a1172" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_report" ADD CONSTRAINT "FK_40b16adf632f2784ab05daddf83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_49296d11229074f058b7274ae2e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_6f3a4634b324103ef13a4903cea" FOREIGN KEY ("expenseReportId") REFERENCES "expense_report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_6f3a4634b324103ef13a4903cea"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_49296d11229074f058b7274ae2e"`);
        await queryRunner.query(`ALTER TABLE "expense_report" DROP CONSTRAINT "FK_40b16adf632f2784ab05daddf83"`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" DROP CONSTRAINT "FK_fd81184a6190944db3f977a1172"`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" DROP CONSTRAINT "FK_8d799176e3fc8cd28b933421a1b"`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" DROP CONSTRAINT "FK_e257abe4a8cc7b61e0537dd538a"`);
        await queryRunner.query(`ALTER TABLE "bank" DROP CONSTRAINT "FK_f023abe054fcf7b1d67cd4c8a13"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP CONSTRAINT "FK_3b0d75b641577e48e0212811f06"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP CONSTRAINT "FK_e36622c949378a161cffe683bd5"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP CONSTRAINT "FK_2a52f200ad97de1d4c77db09819"`);
        await queryRunner.query(`ALTER TABLE "utility_type" DROP CONSTRAINT "FK_e7f5ff163f99b9e2aab74310208"`);
        await queryRunner.query(`ALTER TABLE "paycheck" DROP CONSTRAINT "FK_761037f07e910d787b6925303d7"`);
        await queryRunner.query(`ALTER TABLE "paycheck" DROP CONSTRAINT "FK_e228bb7fead660bc696781fbe63"`);
        await queryRunner.query(`ALTER TABLE "income_report" DROP CONSTRAINT "FK_62e3ce599b052e05d25808a9159"`);
        await queryRunner.query(`ALTER TABLE "other_income" DROP CONSTRAINT "FK_70afacb32e3de9e8d7fa00dec62"`);
        await queryRunner.query(`ALTER TABLE "other_income" DROP CONSTRAINT "FK_a15f89f13c697538be7c875b0d8"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP CONSTRAINT "FK_420900c979f7f447e32e99ac39d"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP CONSTRAINT "FK_490d0f84acfb0e7cda628b167ee"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP CONSTRAINT "FK_51e792de8d79851b696499b9f3f"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" DROP CONSTRAINT "FK_f4665f8ca0dda529038f23374ce"`);
        await queryRunner.query(`DROP TABLE "rent"`);
        await queryRunner.query(`DROP TABLE "expense_report"`);
        await queryRunner.query(`DROP TABLE "card_end_of_month_statement"`);
        await queryRunner.query(`DROP TABLE "bank"`);
        await queryRunner.query(`DROP TABLE "utility"`);
        await queryRunner.query(`DROP TABLE "utility_type"`);
        await queryRunner.query(`DROP TABLE "paycheck"`);
        await queryRunner.query(`DROP TABLE "income_report"`);
        await queryRunner.query(`DROP TABLE "other_income"`);
        await queryRunner.query(`DROP TABLE "employee_benefit"`);
        await queryRunner.query(`DROP TABLE "employee_benefit_type"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
