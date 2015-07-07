require('es6-promise').polyfill();
var Promise = require('es6-promise').Promise;

var rdbCrud = function(params){

  var r, table;

  function valObjectParams() {

    if (!params.hasOwnProperty('r')) {
      throw '\n----------------------------------------------------------------------------------\n' +
            'r property is missing.\n' +
            'This property corresponds to the rethinkdbdash object already configured.' +
            '\n----------------------------------------------------------------------------------\n';
    }

    if (!params.hasOwnProperty('table')) {
      throw '\n----------------------------------------------------------------------------------\n' +
            'table property is missing.\n' +
            'This property corresponds to the RethinkDB table where CRUD events will be executed.' +
            '\n----------------------------------------------------------------------------------\n';
    }

    if (typeof params.r !== 'function') {
      throw '\n----------------------------------------------------------------------------------\n' +
            'r property should be a function.\n' +
            '----------------------------------------------------------------------------------\n';
    }

    if (typeof params.table !== 'string') {
      throw '\n----------------------------------------------------------------------------------\n' +
            'table property should be a string.\n' +
            '----------------------------------------------------------------------------------\n';
    }

    r      = params.r || function(){};
    table  = params.table || '';

  }

  valObjectParams();

  return {
    
    // Read
    read: function read(params){

      params = params || {};

      return new Promise(function(resolve, reject){
        try {

          if (!params.hasOwnProperty('filter')) {
            // If it doesn't have a filter
            r.table(table).run(function(err, results){

              if (err) {
                throw err;
              } else {
                  resolve(results);
              }

            });

          } else {
            // If it has a filter
            if (typeof params.filter !== 'object' && typeof params.filter !== 'function')
              throw 'filter property should be an object or function.';

            r.table(table)
              .filter(params.filter)
              .run(function(err, results){

              if (err) {
                throw err;
              } else {
                  resolve(results);
              }

            });
          }

        } catch (err) {
          reject(err);
        }
      });

    },

    // Create
    create: function create(params){

      params          = params || {};
      params.validate = params.validate || function(){};

      return new Promise(function(resolve, reject){
        try {

          if (!params.hasOwnProperty('item'))
            throw 'item property is missing.';

          if (!Array.isArray(params.item))
            throw 'item property should be an array.';

          if (typeof params.validate !== 'function')
            throw 'validate property should be a function.';

          // Execute validation
          params.item.forEach(function(item){
              params.validate(item);
          });

          r.table(table)
           .insert(params.item)
           .run(function(err, results){

            if (err) {
              throw err;
            } else {
                resolve(results);
            }

          });

        } catch (err) {
          reject(err);
        }
      });

    },

    // Update
    update: function update(params){

      params = params || {};

      return new Promise(function(resolve, reject){
        try {

          if (!params.hasOwnProperty('item'))
            throw 'item property is missing.';

          if (typeof params.item !== 'object')
              throw 'item property should be an object.';

          if (!params.hasOwnProperty('filter')) {
            // If it doesn't have a filter
            r.table(table)
             .update(params.item)
             .run(function(err, results){

              if (err) {
                throw err;
              } else {
                  resolve(results);
              }

            });

          } else {
            // If it has a filter
            if (typeof params.filter !== 'object' && typeof params.filter !== 'function')
              throw 'filter property should be an object or function.';

            r.table(table)
              .filter(params.filter)
              .update(params.item)
              .run(function(err, results){

              if (err) {
                throw err;
              } else {
                  resolve(results);
              }

            });
          }

        } catch (err) {
          reject(err);
        }
      });

    },
    // Delete
    // Exists
  }

};

module.exports = rdbCrud;
