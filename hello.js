
var http     = require('http'),
	bodyParser   = require('body-parser');

var multer = require('multer'); //multiple form data
const pg    = require('pg');//postgres

pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/juego_rompecabezas';
var conString = "postgres://postgres:postgres@localhost:5432/juego_rompecabezas";
//var conString = "postgres://ouotpxpfgzvdif:14f8728c627f11f8a487cdf5a21b6625efcf196a70f03529ebacd6aa9468c80e@ec2-54-163-249-237.compute-1.amazonaws.com:5432/df2rtm1mo3h4vl";

var express = require('express');
var exphbs  = require('express-handlebars');

var formidable = require('formidable'), //paa parsear upload files
    fs   = require('fs-extra'); //copiar img sin overwrite

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

//RUTAS
app.get('/', function (req,res) {
	res.render('partials/index');
});

app.get('/iniciarsesion', function (req,res) {
	res.render('partials/iniciarsesion');
});

app.get('/menu', function (req,res) {
	res.render('partials/menu');
});

//rutas usuarios
app.get('/menuUsuarios', function (req,res) {
	res.render('partials/menuUsuarios');
});
app.get('/editarUsuario', function (req,res) {
	res.render('partials/editarUsuario');
});

app.get('/nuevoUsuario', function (req,res) {
	res.render('partials/nuevoUsuario');
});

//rutas niños
app.get('/menuNinos', function (req,res) {
	res.render('partials/menuNinos');
});
app.get('/nuevoNino', function (req,res) {
	res.render('partials/nuevoNino');
});

app.get('/editarNino', function (req,res) {
	res.render('partials/editarNino');
});

app.get('/rompecabezanino', function (req,res) {
	res.render('partials/rompecabezanino');
});

//rutas rompecabezas
app.get('/nuevoRompecabeza', function (req,res) {
	res.render('partials/nuevoRompecabeza');
});

app.get('/listarRompecabezas', function (req,res) {
	res.render('partials/listarRompecabezas');
});

app.get('/menuRompecabezas', function (req,res) {
	res.render('partials/menuRompecabezas');	
});
app.get('/editarRompecabeza', function (req,res) {
	res.render('partials/editarRompecabeza');	
});

//CRUD USUARIOS
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

app.post('/listarUsuarioPorId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM usuarios WHERE id="+req.body.idUsr+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/guardarUsuarios', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("INSERT INTO usuarios (usuario, contrasena, nombre) VALUES ('"+req.body.usuario+"','"+req.body.pass+"','"+req.body.nombre+"')", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/guardarEditarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE usuarios SET nombre = '"+req.body.nombre+"', usuario = '"+req.body.usuario+"', contrasena = '"+req.body.pass+"' WHERE id="+req.body.id+";" , function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/eliminarUsuarios', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM usuarios WHERE id="+req.body.idUsr+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

//CRUD NIÑOS

app.post('/guardarNinos', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("INSERT INTO ninos (nombre, score, imagen) VALUES ('"+req.body.nombre+"', '"+req.body.score+"', '"+req.body.imagen+"')", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/guardarEditarNino', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE ninos SET nombre = '"+req.body.nombre+"', score = '"+req.body.score+"', imagen = '"+req.body.imagen+"' WHERE id="+req.body.id+";" , function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/eliminarNinos', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM ninos WHERE id="+req.body.idN+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/listarNinoPorId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM ninos WHERE id="+req.body.idN+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.get('/listarNinos', (req, res, next) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM ninos', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

//CRUD ROMPECABEZAS
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

app.post('/listarRompecbzPorId', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("SELECT * FROM rompecabezas WHERE id="+req.body.id+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/eliminarRmp', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("DELETE FROM rompecabezas WHERE id="+req.body.id+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/guardarRompecabeza', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("INSERT INTO rompecabezas (titulo, sonido, imagen, piezas,idusuario) VALUES ('"+req.body.titulo+"','"+req.body.sonido+"','"+req.body.imagen+"',"+req.body.piezas+","+req.body.idusuario+")", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

app.post('/guardarEditarRompecabeza', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query("UPDATE rompecabezas SET titulo='"+req.body.titulo+"', sonido='"+req.body.sonido+"', imagen='"+req.body.imagen+"', piezas="+req.body.piezas+" WHERE id="+req.body.id+";", function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);
            
        }); 
    });
});

//SUBIR IMAGENES
 app.post('/subir', (req, res) => {
    req.fields; // contains non-file fields 
    req.files; // contains files 
    var form = new formidable.IncomingForm();
 
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});

    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'public/rompecabeza/';
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
        res.end(file_name);
    });
    

});
//console.log("Servidor Express escuchando en modo %s", app.settings.env);


console.log("Servidor iniciado");
    // escuchar
    app.listen(5000);
