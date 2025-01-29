const { CustomError } = require("../utility/custom-errors");
const { validateToken } = require("../utility/jwt");


module.exports = (req,res,next)=>{
    try {
        req.context = {};
        const bearerToken = req.headers && req.headers.authorization && req.headers.authorization.replace('Bearer', '').trim();
        if (!bearerToken) {
            throw new Error('invalid token');
        }
        req.context.user =  validateToken(bearerToken)
    } catch (error) {
        next(new CustomError('INVALID_TOKEN',err.message ?? 'invalid token',403))
    }    
};