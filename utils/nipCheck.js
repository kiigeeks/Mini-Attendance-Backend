//function untuk cek nip di db
const UsersModel = require('../models/users')

const nipCheck = async (nip) => {
    const userData = await UsersModel.findOne({ where: { nip: nip } })
    return userData
}

module.exports = nipCheck