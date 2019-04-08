/* eslint-disable no-unused-vars */
/* eslint radix: ["error", "as-needed"] */
/**
 * Created by Eshemogie Kassim(Jnr) on 09/11/2017.
 */

const config = require('../config/config');

// let pageParam;
class MongoDBHelper {
  /**
     * The constructor
     *
     * @param mongoDBClient - MongoDB client
     * @param mongoDBModel - the model you wish to operate on
     */
  constructor(mongoDBClient, mongoDBModel) {
    this.mongoDBClient = mongoDBClient;
    this.mongoDBModel = mongoDBModel;
  }

  /**
     * Fetches a single record from the connected MongoDB instance.
     *
     * @param params
     * @returns {Promise}
     */
  get(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.findOne(params.conditions);

      if (params.fields) { query.select(params.fields); }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(this.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Fetches a single record from the connected MongoDB instance.
     * This uses the find().limit() instead of the findOne().
     * There is significant increase in performance...
     * A magnitude in the order of 2.
     * Ref: https://blog.serverdensity.com/checking-if-a-document-exists-mongodb-slow-findone-vs-find/
     *
     * @param params
     * @returns {Promise}
     */
  getOneOptimised(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.find(params.conditions).limit(1);

      if (params.fields) { query.select(params.fields); }

      return query.exec((err, modelData) => {
        if (err) {
          return reject(this.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Fetches bulk records from the connected MongoDB instance.
     *
     * @param params
     * @returns {Promise}
     */
  getBulk(parameters) {
    const params = parameters;
    return new Promise((resolve, reject) => {
      if (!params.limit) {
        params.limit = config.mongodb.query_limit;
      }

      const query = this.mongoDBModel.find(params.conditions);

      if (params.fields) {
        query.select(params.fields);
      }


      if (params.distinct) {
        query.distinct(params.distinct);
      } else {
        query.limit(params.limit);
      }

      if (params.sort) {
        query.sort(params.sort);
      }


      return query.exec((error, modelData) => {
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(modelData);
      });
    });
  }

  paginate(query, options) {
    return this.mongoDBModel.paginate(query, options);
  }
  /**
     * Aggregates data within MongoDB by certain conditional criteria and returns same.
     * Typically used in report generation or logs...
     * But advisable to do logging/report aggregation on a stacked DB that is highly
     * optimised for search,.. E.g Elastic Search or GraphDB
     *
     * @param params
     * @returns {Promise}
     */
  aggregriate(params) {
    return new Promise((resolve, reject) => {
      const query = this.mongoDBModel.aggregate(params.conditions);

      return query.exec((err, modelData) => {
        if (err) {
          return reject(this.handleError(err));
        }
        return resolve(modelData);
      });
    });
  }


  /**
     * Saves data into the MongoDB instance
     *
     * @param data
     * @returns {Promise}
     */
  save(data) {
    return new Promise((resolve, reject) => {
      const mongodbSaveSchema = this.mongoDBModel(data);

      return mongodbSaveSchema.save((error, savedData) => {
        if (error != null) {
          return reject(this.handleError(error));
        }
        return resolve(savedData);
      });
    });
  }


  /**
     * Updates a SINGLE RECORD in the MongoDB instance's DB based on some conditional criteria
     *
     * @param params - the conditional parameters
     * @param data - the data to update
     * @returns {Promise}
     */
  update(params, data) {
    return new Promise((resolve, reject) => this.mongoDBModel.findOneAndUpdate(
      params.conditions, { $set: data }, { new: true },
      (error, response) => {
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(response);
      }
    ));
  }


  /**
     * Updates MULTIPLE RECORDS within the MongoDB instance's DB based on some conditional criteria
     *
     * @param params - the conditional parameters
     * @param data - the data to update
     * @returns {Promise}
     */
  updateBulk(params, data) {
    return new Promise((resolve, reject) => this.mongoDBModel.update(
      params.conditions,

      { $set: data },

      { new: true, multi: true }, (error, response) => { // {multi: true},
        if (error) {
          return reject(this.handleError(error));
        }
        return resolve(response);
      }
    ));
  }


  /**
     * This closes the connection from this client to the running MongoDB database
     *
     * @returns {Promise}
     */
  close() {
    return new Promise((resolve, reject) => {
      this.mongoDBClient.close();

      return resolve({
        error: false,
        msg: 'connection was successfully closed. Why So Serious, I am gone for a vacation!',
      });
    });
  }


  /**
     * Used to format the error messages returned from the MongoDB server during CRUD operations
     *
     * @param report
     * @returns {{error: boolean, message: *}}
     */
  static handleError(report) {
    return { error: true, msg: report };
  }
}

module.exports = MongoDBHelper;
