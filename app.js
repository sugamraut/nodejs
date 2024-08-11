const express = require('express')
const { users } = require('./model/index')
const app = express()
//const bcrypt= require('bcrypt')

const { renderHomepage, renderRegisterpage, renderLoginPage, handelRegister, handelLogin } = require('./controller/authController')
//const { where } = require('sequelize')

require("./model/index")
// const app = require("express")()
const authRoute= require("./routes/authRoute")
const questionRoute = require("./routes/questionRoute")

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))//ssr
app.use(express.json())//external lke react,vue js

app.get('/',renderHomepage)

app.use("/",authRoute)
app.use("/",questionRoute)

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