import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveUserTimestamps1700000000001 implements MigrationInterface {
    name = 'RemoveUserTimestamps1700000000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "created_at");
        await queryRunner.dropColumn("users", "updated_at");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
                isNullable: false,
            })
        );
        
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
                onUpdate: "CURRENT_TIMESTAMP",
                isNullable: false,
            })
        );
    }
}