import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env['USER_POSTGRES_HOST'] ?? '127.0.0.1',
  port: process.env['USER_POSTGRES_PORT']
    ? +process.env['USER_POSTGRES_PORT']
    : 5432,
  username: process.env['USER_POSTGRES_USERNAME'] ?? 'postgres',
  password: process.env['USER_POSTGRES_PASSWORD'] ?? 'changeme',
  database: process.env['USER_POSTGRES_DATABASE'] ?? 'nestdb',
  entities: ['src/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
});
