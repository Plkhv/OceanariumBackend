import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1715013887886 implements MigrationInterface {
    name = 'Initial1715013887886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_ticket" DROP CONSTRAINT "FK_ef7c6a0cc87407784a441e6d96f"`);
        await queryRunner.query(`ALTER TABLE "client_ticket" DROP CONSTRAINT "FK_cb0b8e5fbc5b5ee3f07b7730504"`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" DROP CONSTRAINT "FK_42e2914717b1775ea4405a51dde"`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" DROP CONSTRAINT "FK_d1bf4b1db8f574ffd6f786582d6"`);
        await queryRunner.query(`ALTER TABLE "client_ticket" ADD CONSTRAINT "FK_ef7c6a0cc87407784a441e6d96f" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_ticket" ADD CONSTRAINT "FK_cb0b8e5fbc5b5ee3f07b7730504" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" ADD CONSTRAINT "FK_42e2914717b1775ea4405a51dde" FOREIGN KEY ("exhibit_id") REFERENCES "exhibits"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" ADD CONSTRAINT "FK_d1bf4b1db8f574ffd6f786582d6" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" DROP CONSTRAINT "FK_d1bf4b1db8f574ffd6f786582d6"`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" DROP CONSTRAINT "FK_42e2914717b1775ea4405a51dde"`);
        await queryRunner.query(`ALTER TABLE "client_ticket" DROP CONSTRAINT "FK_cb0b8e5fbc5b5ee3f07b7730504"`);
        await queryRunner.query(`ALTER TABLE "client_ticket" DROP CONSTRAINT "FK_ef7c6a0cc87407784a441e6d96f"`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" ADD CONSTRAINT "FK_d1bf4b1db8f574ffd6f786582d6" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exhibit_ticket" ADD CONSTRAINT "FK_42e2914717b1775ea4405a51dde" FOREIGN KEY ("exhibit_id") REFERENCES "exhibits"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_ticket" ADD CONSTRAINT "FK_cb0b8e5fbc5b5ee3f07b7730504" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_ticket" ADD CONSTRAINT "FK_ef7c6a0cc87407784a441e6d96f" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
