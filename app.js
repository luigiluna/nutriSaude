const router = require('./routes/index');
const express = require('express');
const mustache = require('mustache-express');


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');


const dotenv = require("dotenv");

dotenv.config();


//config
const app = express();

//Mostrando o app qual a pasta publica do projeto (acessivel de todo o sistema)
app.use(express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Falando pro app qual o motor para render no layout que vamos utilizar
app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));   //Passando como parametro a pasta das partials, a extensão dos arquivos
app.set('view engine', 'mst');

app.use(cookieParser(process.env.COOKIE));
app.use(flash());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10 * 60 * 60 * 1000}
}))



app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));


app.use(passport.initialize());
app.use(passport.session());

const userMiddleware = require('./middlewares/UserMiddleware');

app.use(async (req,res,next)=> {
    res.locals.user = req.user;
    res.locals.flashes = req.flash();
    res.locals.doctors = [];
    res.locals.doctors = await userMiddleware.getDoctors();
    
    next();
})


const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', router);

//Indicando a pasta que contem as views
app.set('views', __dirname + '/views');

module.exports = app;