var http        = require('http'),
    express     = require('express'),
    app         = new express(),
    bodyParser  = require('body-parser'),
    ejs         = require('ejs-locals'),
    r           = require('rethinkdbdash')({
                    servers :[{host: 'localhost', db: 'dbo_rethinkdbcrud'}],
                    buffer  : 5,
                    max     : 10
                  }),
    rdbCrud     = require('./dist/rethinkdb-crud'),
    crudUsers   = rdbCrud({ r: r, table: 'tblUsers' });

// VIEWS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejs);

// REQUESTS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// PUBLIC
app.use(express.static( __dirname + '/public' ));

// ROUTES
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main/index');
});

// CREATE
/*
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
*/

// READ
/* Read All */
/*
crudUsers.read()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

 /* Read with Filter by object */
 /*
 crudUsers.read({ filter: { age: 31 } })
          .then(function(result){
            console.log(result);
          })
          .catch(function(err){
            console.log(err);
          });
*/

/* Read with Filter by statement */
/*
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
*/

// UPDATE
/* Update All */
/*
crudUsers.update({
            set: { age: 10 }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

 /* Update with Filter by object */
 /*
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
*/

/* Update with Filter by statement */
/*
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
*/

// DELETE
/* Delete All */
/*
crudUsers.delete()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

/* Delete with Filter by object */
/*
crudUsers.delete({
          filter: { name: 'A' }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

/* Delete with Filter by statement */
/*
crudUsers.delete({
          filter: r.row('age').gt(30)
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

// COUNT
/* Count All */
/*
crudUsers.count()
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

/* Count with Filter by object */
/*
crudUsers.count({
          filter: { name: 'steven' }
         })
         .then(function(result){
           console.log(result);
         })
         .catch(function(err){
           console.log(err);
         });
*/

/* Count with Filter by statement */
/*
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
*/

// ROUTER
app.use(router);

// LISTEN
app.listen(3000);
