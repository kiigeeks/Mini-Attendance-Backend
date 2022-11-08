//function untuk format pengiriman json
const sendResponse = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        message: message,
        result : data
    });
}

module.exports = sendResponse