// Configuracoes
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


const app = express();
const port = 8000;

// DB
const db = require('./db/connection');

// Templte Engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

// Importacao de rotas 
const notesRoutes = require('./routes/notes');

// Rotas
app.get('/', async function(req, res){
   
        const notes = await db.getDb().db().collection('notes').find({}).toArray();

    
    res.render('home', {notes});

})

app.use('/notes', notesRoutes);


db.initDb((err, db) => {
    if(err) {
            console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Projeto rodando na porta :  ${port} `);
            console.log('Banco conectado');
        })
        
    }
    })

