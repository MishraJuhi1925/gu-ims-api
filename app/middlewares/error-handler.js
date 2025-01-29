const { CustomError } = require("../utility/custom-errors")

module.exports = (err,req,res,next)=>{
    if (err instanceof CustomError) {
        res.status(err.statusCode||500).json({
            sucesss:false,
            error:{
                message:err.message,
                code:err.code,
                statusCode:err.statusCode,
                stack: err.stack ? err.stack.toString() : null
            }
        })
    }
    else{
        res.status(500).json({
            sucesss:false,
            error:{
                message:'Internal Server Error',
                code:'INTERNAL_SERVER_ERROR',
                statusCode:500,
                stack: err.stack ? err.stack.toString() : null
            }
        })
    }
    

    next()
}