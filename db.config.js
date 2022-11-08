const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_absensi', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: '8889'
})

module.exports = sequelize