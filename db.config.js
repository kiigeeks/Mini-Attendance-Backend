const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_absensi', 'root', 'mj26', {
    dialect: 'mysql',
    host: 'localhost',
    port: '8889'
})

module.exports = sequelize