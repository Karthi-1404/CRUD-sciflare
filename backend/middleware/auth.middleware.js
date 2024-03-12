const jwt = require('jsonwebtoken')
module.exports = (req,res,next)=>{
    try {
        console.log('req midd=======',req.header('Authorization'));
    //     const authHeader = req.header['Authorization'];
    //    const token = authHeader && authHeader.split(' ')[1];
    //    if (token == null) return res.sendStatus(401);
        const token =  req.header('Authorization').split(" ")[1]
        if(!token || token === null) throw new Error('Please Login')
        console.log('token',token);
        const decrypttoken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log('decrypttoken',decrypttoken);
        if(decrypttoken.userId){
           req.body.userId = decrypttoken.userId
        }
        next() 
    } catch (error) {
         res.send({
            message:error.message
         })
    }
     
}