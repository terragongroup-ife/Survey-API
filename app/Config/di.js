const config = require('../Config/config');
const mongo = require('mongoose');
const serviceLocator = require('../lib/service_locator');
const logging = require('../lib/logging');


/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => logging.create(config.logging));



/**
 * Returns an instance of mongo
 */
serviceLocator.register('mongo', () => {
    const connectionUrl = (!config.mongo.connection.username || !config.mongo.connection.password) ? `mongodb://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}` : `mongodb://${config.mongo.connection.username}:${config.mongo.connection.password}@${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}`;
    return mongo.connect(connectionUrl);
  });


  /**
 * Creates an instance of the Transaction Service
 */
serviceLocator.register('transactionIdService', (servicelocator) => {
    const logger = servicelocator.get('logger');
    const mongoclient = servicelocator.get('mongo');
    return new TransactionService(logger, mongoclient);
  });
  

  module.exports = serviceLocator;