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

app.get('/edit-usuario/:id', (req, res)=>{
    usuario.findAll({
        where: {'id': req.params.id}
    }).then((user)=>{
        res.render('edit_usuario', {user: user.map(user=> user.toJSON())})
    }).catch((erro)=>{
        console.log('ocorreu um erro ao buscar este registro'+erro)
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

app.post('/update-usuario/:id', (req, res)=>{
    usuario.update({ 
        nome: req.body.name,
        idade: req.body.idade,
        email: req.body.email
    },{
        where: { 'id': req.params.id}
    }).then(()=>{
        res.redirect('/')
    }).catch((erro)=>{
        console.log('não foi possivel alterar registro'+erro)
    })
})

app.listen(8080, ()=>{
    console.log('app rodando')
})