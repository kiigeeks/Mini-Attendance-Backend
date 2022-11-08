const express = require('express')
const router = express.Router()
const AbsensiModel = require('../models/absensi')
const absensiCheck = require('../utils/absensiCheck')
const sendResponse = require('../utils/response')

// routing endpoint absensi utama
router.get('/', async (req, res) => {
    try {
        const absensi = await AbsensiModel.findAll()
        sendResponse(200, absensi, "Success Get All Absensi", res)
    } catch (error) {
        sendResponse(500, error.message, "Error Get All Data", res)
    }
})

// routing detail absensi user 
router.get('/:nip', async (req, res) => {
    try {
        const detailAbsensi = await AbsensiModel.findAll({
            where: {
                users_nip: req.params.nip
            }
        })
        sendResponse(200, detailAbsensi, "Success Get All Detail Absensi", res)
    } catch (error) {
        sendResponse(500, error.message, "Error Get All Detail Data", res)
    }
})

router.post('/checkin', async (req, res) => {
    const { nip } = req.body

    //validasi check absen
    const checkIn = await absensiCheck(nip, "in")
    if(checkIn) return sendResponse(400, "", "Maaf Anda Sudah Checkin Hari ini", res)
    
    try {
        const absensi = await AbsensiModel.create({
            users_nip: nip, status: 'in'
        })
        sendResponse(201, absensi, "Anda Berhasil Melakukan Checkin", res)
    } catch (error) {
        sendResponse(500, error.message, "Error Create Data", res)
    }
})

router.post('/checkout', async (req, res) => {
    const { nip } = req.body

    //validasi check absen
    const checkOut= await absensiCheck(nip, "out")
    if(checkOut) return sendResponse(400, checkOut, "Maaf Anda Sudah Checkout Hari ini", res)

    try {
        const absensi = await AbsensiModel.create({
            users_nip: nip, status: 'out'
        })
        sendResponse(201, absensi, "Anda Berhasil Melakukan Checkout", res)
    } catch (error) {
        sendResponse(500, error.message, "Error Create Data", res)
    }
})

module.exports = router