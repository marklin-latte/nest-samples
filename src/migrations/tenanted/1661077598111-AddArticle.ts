import {
  MigrationInterface,
  QueryRunner,
  Table,
  DefaultNamingStrategy,
} from 'typeorm';

const nameStrategy = new DefaultNamingStrategy();
export class AddArticle1638963391898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const articleTable = new Table({
      columns: [
        {
          isPrimary: true,
          name: 'id',
          type: 'uuid',
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          length: '255',
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          default: 'now()',
          name: 'createdAt',
          type: 'timestamp with time zone',
        },
        {
          default: 'now()',
          name: 'updatedAt',
          type: 'timestamp with time zone',
        },
      ],
      name: nameStrategy.tableName('Article', undefined),
    });
    await queryRunner.createTable(articleTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(nameStrategy.tableName('Article', undefined));
  }
}
