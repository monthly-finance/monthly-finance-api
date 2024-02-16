import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1707967245461 implements MigrationInterface {
    name = 'InitMigration1707967245461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "wage" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "wage" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "other_income" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "other_income" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "utility_type" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "utility_type" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "utility" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "bank" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "bank" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "card_end_of_month_statement" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bank" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bank" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "utility" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "utility" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "utility_type" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "utility_type" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "other_income" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "other_income" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wage" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wage" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_benefit" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee_benefit_type" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
