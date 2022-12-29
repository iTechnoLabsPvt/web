export const typeormConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'antenna-postgres',
  database: 'postgres',
  synchronize: true,
  entities: ['src/entity/**/*.ts'],
};
