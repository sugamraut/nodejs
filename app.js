const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt= require('bcrypt')

require("./model/index")
// const app = require("express")()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))//ssr
app.use(express.json())//external lke react,vue js

app.get('/',(req,res)=>{
    res.render('home.ejs')
})


app.get("/register",(req,res)=>{
    res.render("auth/register")
})
/**app.get("/user",async(req,res)=>{
 * const data=await users.findAll()
 * res.json({
 * data
 * })
}) */

app.post("/register",async(req,res)=>{
    const {username,password, email}=req.body
    await users.create({
        email,
        password :bcrypt.hashSync(password,10),
        username
    })
    res.send("redistered sucessfully")
})

app.get("/login",(req,res)=>{
    res.render('auth/login')
})


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