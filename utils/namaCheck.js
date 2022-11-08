//function pengecekkan string nama
const namaCheck = (str) => {
    return /^[a-zA-Z\s.,]+$/.test(str);
}

module.exports = namaCheck