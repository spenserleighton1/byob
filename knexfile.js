// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/united_states',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/test_united_states',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    // connection: 'postgres://ijjijoeqdqoubt:960ec74bddf38e42f9630410c90f6a7cc4c3c2678154926c10c13587e1fb7a05@ec2-23-23-216-40.compute-1.amazonaws.com:5432/dbv13ccnd32sf6',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/prod'
    },
    useNullAsDefault: true
  }

};
