module.exports = {
  http: {
    port: process.env.PORT || 3000,
  },
  typeorm: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'antenna-postgres',
    name: 'postgres',
  },
};
