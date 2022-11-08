//function untuk cek data absensi
const AbsensiModel = require('../models/absensi')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;

const absensiCheck = async (nip, statusAbsen) => {
    //get date & set range date
    let date_time = new Date()
    let date = ("0" + date_time.getDate()).slice(-2)
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2)
    let year = date_time.getFullYear()
    const dateStart = year + "-" + month + "-" + date + " 00:00:00"
    const dateEnd = year + "-" + month + "-" + date + " 23:59:59"

    const userDataAbsen = await AbsensiModel.findOne({ where: { users_nip: nip, status:statusAbsen, createdAt: { [Op.between]: [ dateStart, dateEnd ] } } })
    
    return userDataAbsen
}

module.exports = absensiCheck