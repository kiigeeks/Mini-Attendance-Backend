const express = require('express')
const cors = require('cors')
const userEndPoint = require('./routes/users')
const absensiEndPoint = require('./routes/absensi')

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready !'))

const port = 3200
const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userEndPoint)
app.use('/absensi', absensiEndPoint)

app.listen(port, () => console.log(`running server at http://localhost:${port}`));
