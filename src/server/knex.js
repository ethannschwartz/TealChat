const knex = require('knex');
module.exports = {

  development: {
    client: 'pg',
    connection: {

    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'chat-app',
      user:     'postgres',
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
    connection: {
      database: 'chat-app',
      user:     'postgres',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    database: 'chat-app',
  },
});


module.exports = {
  db
}
