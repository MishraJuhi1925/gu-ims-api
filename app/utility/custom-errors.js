class CustomError extends Error {
    constructor(code,message,statusCode){
        super(message)
        this.code = code;
        this.statusCode = statusCode || 500;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {
    CustomError
}