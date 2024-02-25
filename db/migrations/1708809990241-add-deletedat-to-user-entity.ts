import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedatToUserEntity1708809990241 implements MigrationInterface {
    name = 'AddDeletedatToUserEntity1708809990241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

}
