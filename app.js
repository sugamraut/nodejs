const express = require('express')
const { users } = require('./model/index')
const app = express()
//const bcrypt= require('bcrypt')

const { renderHomepage, renderRegisterpage, renderLoginPage, handelRegister, handelLogin } = require('./controller/authController')
//const { where } = require('sequelize')

require("./model/index")
// const app = require("express")()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))//ssr
app.use(express.json())//external lke react,vue js

app.get('/',renderHomepage)


app.get("/register",renderRegisterpage)
/**app.get("/user",async(req,res)=>{
 * const data=await users.findAll()
 * res.json({
 * data
 * })
}) */

app.post("/register",handelRegister)

app.get("/login",renderLoginPage)
app.post("/login",handelLogin)


app.use(express.static('public/css/'))

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Project has started at port ${PORT}`)
})

//rest api
/*
/getBlogs-get
/singleblog/:id-get
/deleteblog/:id-delete

*/