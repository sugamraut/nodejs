const express = require('express')
const { users } = require('./model/index')
const app = express()
const cookieParser= require("cookie-parser")
const { renderHomePage } = require('./controllers/authController')
const jwt = require("jsonwebtoken")
require("./model/index")
// const app = require("express")()
const authRoute= require("./routes/authRoute")
const questionRoute = require("./routes/questionRoute")
const answerRoute=require("./routes/answerRoute")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))//ssr
app.use(express.json())//external lke react,vue js
app.use(cookieParser())
const {promisify} = require('util')
app.get('/',renderHomePage)

app.use(async (req,res,next)=>{
  const token =  req.cookies.jwtToken 
 try {
   const decryptedResult =  await promisify(jwt.verify)(token,'hahaha')
   if(decryptedResult){
       res.locals.isAuthenticated = true 
   }else{
        res.locals.isAuthenticated = false 
   }
 } catch (error) {
   res.locals.isAuthenticated = false 
 }
  next()
})

app.use("/",authRoute)
app.use("/",questionRoute)
app.use("/answer",answerRoute)

app.use(express.static("./storage/"))

app.use(express.static('public/css/'))

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})

