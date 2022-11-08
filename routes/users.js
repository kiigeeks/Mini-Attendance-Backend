const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passwordCheck = require('../utils/passwordCheck')
const nipCheck = require('../utils/nipCheck')
const namaCheck = require('../utils/namaCheck')
const sendResponse = require('../utils/response')

// routing endpoint users utama
router.get('/', async (req, res) => {
    try {
        const users = await UsersModel.findAll()
        sendResponse(200, users, "Success Get All Users", res)
    } catch (error) {
        sendResponse(500, error.message, "Error Get All Data", res)
    }
})

//routing registrasi
router.post('/', async (req, res) => {
    const { nip, nama, password } = req.body

    //validasi
    if (!nip || !nama || !password) return sendResponse(400, "", "Data Input Tidak Boleh Kosong", res)
    if (isNaN(nip)) return sendResponse(400, "", "NIP hanya bisa diisi dengan Angka", res)
    const checkNama = namaCheck(nama)
    if (!checkNama) return sendResponse(400, "", "Nama Tidak Boleh Mengandung Angka dan Symbol", res)
    const checkNIP = await nipCheck(nip)
    if(checkNIP) return sendResponse(400, checkNIP, "Maaf NIP Sudah Terdaftar", res)

    const encryptedPassword = await bcrypt.hash(password, 10)
    try {
        const users = await UsersModel.create({
            nip, nama, password:encryptedPassword
        })
        sendResponse(201, users, "Selamat Anda Berhasil Mendaftar, Silahkan Login", res)
    }catch(error){
        sendResponse(500, error.message, "Something Wrong", res)
    }
})

//routing update profile
router.put('/', async (req, res) => {
    const { nip, nama, password, passwordBaru } = req.body
    
    //validasi
    if (!nama || !password || !passwordBaru) return sendResponse(400, "", "Data Input Tidak Boleh Kosong", res)
    const checkNama = namaCheck(nama)
    if (!checkNama) return sendResponse(400, "", "Nama Tidak Boleh Mengandung Angka dan Symbol", res)
    const check = await passwordCheck(nip, password)
    if(!check.compare) return SendResponse(400, "", "Password Lama Tidak Sesuai", res)
    
    const encryptedPassword = await bcrypt.hash(passwordBaru, 10)
    try {
        const users = await UsersModel.update({
                nama, password: encryptedPassword
            }, {
            where: {
                nip: nip
            }
        })
        sendResponse(201, users[0], "Data Anda Berhasil Diupdate", res)
    } catch (error) {
        sendResponse(500, error.message, "Something Wrong", res)
    }
    
})

//routing login
router.post('/login', async (req, res) => {
    const { nip, password } = req.body

    //validasi
    if (!nip || !password) return sendResponse(400, "", "Data Input Tidak Boleh Kosong", res)
    if (isNaN(nip)) return sendResponse(400, "", "NIP hanya bisa diisi dengan Angka", res)
    const checkNIP = await nipCheck(nip)
    if(!checkNIP) return sendResponse(400, "", "NIP Tidak Terdaftar", res)

    try {
        const check = await passwordCheck(nip, password)
        if(check.compare) {
            sendResponse(200, check.userData, "Login Success", res)
        } else {
            sendResponse(400, "", "Password Salah", res)
        }
    } catch (error) {
        sendResponse(500, error.message, "Something Wrong", res)
    }
    
})

module.exports = router