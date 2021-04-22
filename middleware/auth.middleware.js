const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async(req, res, next) => {
    if( req.method === 'OPTIONS') {
        return next;
    }
    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decoded = await jwt.verify(token, config.get('jwtSecretKey'));

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
}