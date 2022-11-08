//function pengecekkan password dari NIP di db
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')

const passwordCheck = async (nip, password) => {
    const userData = await UsersModel.findOne({ where: { nip: nip } })
    const compare = await bcrypt.compare(password, userData.password)
    return { compare, userData }
}

module.exports = passwordCheck