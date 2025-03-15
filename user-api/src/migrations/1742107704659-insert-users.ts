import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../user.entity';

export class InsertUsers1742107704659 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(User, ['email'])
      .values([
        { email: 'user1@gmail.com' },
        { email: 'user2@gmail.com' },
        { email: 'user3@gmail.com' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('email IN (:...emails)', {
        emails: ['user1@gmail.com', 'user2@gmail.com', 'user3@gmail.com'],
      })
      .execute();
  }
}
