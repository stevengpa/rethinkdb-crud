# rethinkdb-crud
This is a small NodeJS module that helps you to perform quickly CRUD promises events in a RethinkDB table through a rethinkdbdash object's connection.


### Installation
``` console
npm install rethinkdb-crud --save
```
### Implementation
``` javascript
var r           = require('rethinkdbdash')({
                    servers :[{host: 'YOUR-HOST', db: 'YOUR-DB'}],
                    buffer  : 5, // Demo buffer
                    max     : 10 // Demo max connections
                  }),
    rdbCrud     = require('rethinkdb-crud'), // >> Set the Instance
    crudUsers   = rdbCrud({ r: r, table: 'tblUsers' }); // >> Create the rethinkdb-crud Object

```

## Create
``` javascript
// Demo:
crudUsers.create({
            item: [{ name: 'marta', age: 31 }, { name: 'felipe', age: 32 }],
            validate: function(item) {
              if (item.age < 30)
                throw 'User should be older than 29.'
            }
          })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
```

## Read
``` javascript
// Demo #1: Read All
crudUsers.read()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
         
// Demo #2: Read with Filter by object
 crudUsers.read({ filter: { age: 31 } })
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          });

// Demo #3: Read with Filter by statement
crudUsers.read({
            filter: r.row('age').lt(30)
                    .and
                    ( r.row('age').ge(25) )
          })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
```

## Update
``` javascript
// Demo #1: Update All
crudUsers.update({
            set: { age: 10 }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
         
// Demo #2: Update with Filter by object
 crudUsers.update({
             set: { age: 29 },
             filter: { name: 'steven' }
          })
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          });

// Demo #3: Update with Filter by statement
crudUsers.update({
            set: { name: 'vane' },
            filter: r.row('name').eq('ana')
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
```

## Delete
``` javascript
// Demo #1: Delete All
crudUsers.delete()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
         
// Demo #2: Delete with Filter by object
crudUsers.delete({
          filter: { name: 'A' }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });

// Demo #3: Delete with Filter by statement
crudUsers.delete({
          filter: r.row('age').gt(30)
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
```

## Count
``` javascript
// Demo #1: Count All
crudUsers.count()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
         
// Demo #2: Count with Filter by object
crudUsers.count({
          filter: { name: 'steven' }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });  

// Demo #3: Count with Filter by statement
crudUsers.count({
          filter: r.row('age').ge(25)
                   .and(
                     r.row('age').le(30)
                   )
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
```
