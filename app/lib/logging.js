/**
 * Created by Eshemogie Kassim(Jnr) on 09/11/2017.
 */

const winston = require('winston');
const fs = require('fs');

/**
 * Function reponsible for formatting the log lines,
 * in way that is parsable by our logstash implementation.
 * @param entry the log entry to format
 * @returns {string} the log line that will be passed to the transports
 */
const formatter = function entries(entry) {
  const date = new Date(entry.timestamp()).toISOString();

  const { message } = entry;

  let context = '';
  if (entry.meta && Object.keys(entry.meta).length) {
    context = JSON.stringify(entry.meta);
  }

  return `${date} ${entry.level.toUpperCase()} ${message} ${context}`;
};

/**
 * Generates the timestamp used by the log entries.
 * @returns {number} the timestamp
 */
const generateTimestamp = function generateTimestamp() {
  return Date.now();
};

/**
 * Creates transports based on config values
 * @returns {array} the created transports
 */
const createTransports = function createTransports(config) {
  const transports = [];

  // setup the file transport
  if (config.file) {
    // create the file
    fs.open(config.file, 'w', (err, fd) => {
      if (err) {
        throw new Error(`Unable to create log file at ${config.file}`);
      }

      fs.chmod(config.file, '755');
      fs.close(fd);
    });

    // setup the log transport
    transports.push(new winston.transports.File({
      filename: config.file,
      json: false,
      timestamp: generateTimestamp,
      formatter,
      level: config.level
    }));
  }

  // setup the console transport, because devs don't always want to tail the log file.
  // if config.console is set to true, a console logger will be included.
  if (config.console) {
    transports.push(new winston.transports.Console({
      timestamp: generateTimestamp,
      formatter,
      level: config.level
    }));
  }

  return transports;
};

module.exports = {

  /**
     * Creates a new logger instance using the config provided.
     * @param  {object} config The config used to setup the logger transports.
     * @return {logger} Returns a new instance of the winston logger.
     */
  create(config) {
    return new winston.Logger({
      transports: createTransports(config)
    });
  }
};
