const Sequelize = require('sequelize')

const sequelize = new Sequelize('teste', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}