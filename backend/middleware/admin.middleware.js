
export const adminAcessMiddleware = (req,res,next)=>{
    try {
        if(req.user && req.user.role == 'user'){
            res.send({
                message:'only admin can access'
             }) 
        }else if(req.user && req.user.role == 'admin'){
            next()
        }
        
    } catch (error) {
         res.send({
            message:error.message
         })
    }
     
}