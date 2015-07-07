var rdbCrud = function(params){

  function valObjectParams() {
      if (!params.hasOwnProperty('r')) {
        throw 'r parameter is missing, it is required this rethinkdbdash object already fullfilled';
      }

      if (!params.hasOwnProperty('table')) {
        throw 'table parameter is missing, it is required to perform the actions in the RethinkDB table';
      }
  }
    
  valObjectParams();
    
  return {
    // Read
    // Insert
    // Update
    // Delete
  }

};

module.exports = rdbCrud;
