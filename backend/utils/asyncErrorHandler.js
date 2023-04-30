module.exports = (handlerFunc) => {
    return (req, res, next) => {
        handlerFunc(req, res, next).catch(err => next(err))
    }
}