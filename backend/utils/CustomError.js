module.exports = class CustomError extends Error{
    constructor(message, code){
        super(message)
        this.statusCode = code
        this.status = code >= 400 && code < 500 ? 'fail': 'error'

        Error.captureStackTrace(this, this.constructor)
    }
}