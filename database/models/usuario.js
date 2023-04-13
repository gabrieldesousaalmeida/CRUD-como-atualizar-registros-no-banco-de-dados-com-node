const db = require('../db')

const usuario = db.sequelize.define('User', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

//Criação da tabela
//usuario.sync({force: true})

module.exports = usuario;