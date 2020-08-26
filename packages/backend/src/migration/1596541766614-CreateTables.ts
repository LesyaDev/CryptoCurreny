import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1596541766614 implements MigrationInterface {
    name = 'CreateTables1596541766614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" integer NOT NULL, "userId" integer, CONSTRAINT "REL_3e02d32dd4707c91433de0390e" UNIQUE ("userId"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "userCoinId" integer, "roleId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_1870c2d860e66dd9f0e36fa37b" UNIQUE ("userCoinId"), CONSTRAINT "REL_c28e52f758e7bbc53828db9219" UNIQUE ("roleId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_coin_audit" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "total" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "idUserCoinId" integer, CONSTRAINT "PK_90c0e341ccbfa900d0abba24553" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_coin" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "coinIdId" integer, "currentOwnerId" integer, CONSTRAINT "REL_d9c3c63318ff2c2aab16d2182b" UNIQUE ("currentOwnerId"), CONSTRAINT "PK_b8f87a8dac81c162f17b996afa2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coin" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_650993fc71b789e4793b62fbcac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1870c2d860e66dd9f0e36fa37b3" FOREIGN KEY ("userCoinId") REFERENCES "user_coin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_coin_audit" ADD CONSTRAINT "FK_60647f8840b611876fedc0be40c" FOREIGN KEY ("idUserCoinId") REFERENCES "user_coin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_coin" ADD CONSTRAINT "FK_788c3c0c5ef0c76c8194fcf9d34" FOREIGN KEY ("coinIdId") REFERENCES "coin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_coin" ADD CONSTRAINT "FK_d9c3c63318ff2c2aab16d2182b1" FOREIGN KEY ("currentOwnerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_coin" DROP CONSTRAINT "FK_d9c3c63318ff2c2aab16d2182b1"`);
        await queryRunner.query(`ALTER TABLE "user_coin" DROP CONSTRAINT "FK_788c3c0c5ef0c76c8194fcf9d34"`);
        await queryRunner.query(`ALTER TABLE "user_coin_audit" DROP CONSTRAINT "FK_60647f8840b611876fedc0be40c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1870c2d860e66dd9f0e36fa37b3"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`DROP TABLE "coin"`);
        await queryRunner.query(`DROP TABLE "user_coin"`);
        await queryRunner.query(`DROP TABLE "user_coin_audit"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
