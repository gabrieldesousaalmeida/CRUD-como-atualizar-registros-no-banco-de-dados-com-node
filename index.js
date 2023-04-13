const express = require('express')
const app = express();
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser')
const usuario = require('./database/models/usuario')
const moment = require('moment')

//configurando uso do handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views');

//configurando uso do bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    usuario.findAll().then((usuarios)=>{
        res.render('listar_usuario', {usuarios: usuarios.map(usuarios=> usuarios.toJSON())})
    }).catch((error)=>{
        console.log('erro na busca dos usuarios' + error)
    })
    
})


app.get('/del-usuario/:id', (req, res)=>{
    usuario.destroy({
        where: { 'id': req.params.id}
    }).then(()=>{
        res.redirect('/')
    }).catch((err)=>{
        console.log('erro no delete do registro'+ err)
    })
})
app.get('/cad-usuario', (req, res)=>{
    res.render('cad_usuario')
})

app.post('/add-usuario', (req, res)=>{
    usuario.create({
        nome: req.body.name,
        idade: req.body.idade,
        email: req.body.email
    }).then(()=>{
        console.log('usuario cadastrado')
    }).catch((erro)=>{
        console.log('ocorreu um erro no cadastro do usuario: '+erro)
    })
    res.redirect('/')
})



app.listen(8080, ()=>{
    console.log('app rodando')
})