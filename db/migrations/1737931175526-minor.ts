import { MigrationInterface, QueryRunner } from "typeorm";

export class Minor1737931175526 implements MigrationInterface {
    name = 'Minor1737931175526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" RENAME COLUMN "rentAmount" TO "amount"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" RENAME COLUMN "amount" TO "rentAmount"`);
    }

}
