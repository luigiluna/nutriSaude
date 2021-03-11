const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

//Conectando com o banco de dados
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("ERRO:" + error);
})

//Carregando os models
require('./models/Patient');
require('./models/Queue');
require('./models/User');

const app = require('./app');
app.set('port', 3000);
const server = app.listen(app.get('port'), ()=>{ 
    console.log('Rodando na porta: '+ server.address().port); 
});