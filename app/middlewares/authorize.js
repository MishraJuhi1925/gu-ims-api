const { CustomError } = require("../utility/custom-errors");

module.exports = (req,res,next) => {
    return (...roles)=>{
        try {
            isAuthorized = roles.includes(req.context.user.role);
            if (!isAuthorized) {
                throw new Error('you are not authorized for this route!')
            }
            next()
        } catch (error) {
            next(new CustomError('UNAUTHORIZED_ACCESS',err.message,403))
        }
    }
}