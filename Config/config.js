const appName = 'Survey Test';

const config = {
  appName: process.env.APP_NAME,
  server: {
    port: process.env.APP_PORT
  },
  mongo: {
    salt_value: 10,
    connection: {
      host: process.env.MONGODB_HOST,
      username: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PASSWORD,
      db: process.env.MONGODB_DATABASE_NAME
    },
    collections: {
      users: 'users'
    },
    queryLimit: process.env.MONGODB_QUERY_LIMIT,
    questionLimit: process.env.QUESTION_LIMIT
  },

  mongoErrorCode: {
    duplicateId: 11000
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  }

};

module.exports = config;