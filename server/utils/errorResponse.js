// C:\Users\LENOVO\inventory-system\server\utils\errorResponse.js

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;