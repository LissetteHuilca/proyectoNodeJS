
var http     = require('http'),
	bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/juego_rompecabezas';
var conString = "postgres://postgres:postgres@localhost:5432/juego_rompecabezas";
//var conString = "postgres://ouotpxpfgzvdif:14f8728c627f11f8a487cdf5a21b6625efcf196a70f03529ebacd6aa9468c80e@ec2-54-163-249-237.compute-1.amazonaws.com:5432/df2rtm1mo3h4vl";

var express = require('express');
var exphbs  = require('express-handlebars');

var formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
var app = express();


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

app.engine( 'exphbs', exphbs( { 
  extname: 'exphbs', 
  defaultLayout: 'plantilla', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );

app.set( 'view engine', 'exphbs' );
app.set('port', (process.env.PORT || 5000))

app.get('/', function (req,res) {
	res.render('partials/index');
  		
});

app.get('/listarRompecabezas', function (req,res) {
	res.render('partials/listarRompecabezas');
  		
});

app.get('/listarUsuarios', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM usuarios', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.get('/listarRompecbz', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM rompecabezas', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});
 
//console.log("Servidor Express escuchando en modo %s", app.settings.env);


console.log("Servidor iniciado");
    // escuchar
    app.listen(5000);
