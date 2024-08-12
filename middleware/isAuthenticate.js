 const jwt =require("jsonwebtoken")
 const {promisify}=require('util')
const { users } = require("../model")

exports.isAuthenticated=async(req,res,next)=>{
    const token =req.cookies.jwtToken
  console.log(token)
    if(!token||token===null||token===undefined){
        return res.redirect('/login')
    }
  const decryptedResult=await promisify(jwt.verify)(token,"Raut")
 console.log(decryptedResult)
  const data=await users.findByPk(decryptedResult.id)
  if(!data){
    return res.send("invalid token")
  }
  req.userId=decryptedResult.id
 next()

}