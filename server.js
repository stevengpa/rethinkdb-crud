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
    rdbCrud     = require('./private/rethinkdbcrud'),
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
            item: [{ name: 'A', age: 31 }, { name: 'B', age: 32 }],
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
/* Read without Filter */
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
