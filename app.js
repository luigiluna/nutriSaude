const router = require('./routes/index');
const express = require('express');
const mustache = require('mustache-express');
const path = require('path');

// const passport = require('passport');
// require('./auth')(passport);

const session = require('express-session');
require('dotenv/config');


//config
const app = express();

//Mostrando o app qual a pasta publica do projeto (acessivel de todo o sistema)
app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Falando pro app qual o motor para render no layout que vamos utilizar
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));   //Passando como parametro a pasta das partials, a extensão dos arquivos
app.set('view engine', 'mst');

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {maxAge: 10 * 60 * 60 * 1000}
// }))

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));



app.use('/', router);

//Indicando a pasta que contem as views
app.set('views', __dirname + '/views');

module.exports = app;