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
    crudUsers   = rdbCrud({ r: r, table: 'tblUsers'});

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


// ROUTER
app.use(router);

// LISTEN
app.listen(3000);
