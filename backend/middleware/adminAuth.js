const adminAuth = (req, res, next) => {
    req.admin = "Admin"
    next()
}