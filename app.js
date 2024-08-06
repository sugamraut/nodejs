const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt= require('bcrypt')
const { where } = require('sequelize')

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
    if(!username||!password||!email){
        return res.send("please provide userna,email,password")
    }
    //client side validation
    /** const data=await users.findAll({
        where:{
            email:email
        }
    })
    if (data.length>0){
        return res.send("Already registered email")
    }*/
    
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
app.post("/login", async (req,res)=>{
const {email,password}=req.body
if(!email||!password){
    return res.send("please provide eamol,password")
}
//email check
const [data]= await users.findAll({
    where:{
        email:email
    }
})
if(data){
    //next password check password
    const isMAtched=bcrypt.compareSync(password,data.password)
    if(isMAtched){
        res.send("Logged in success")
    }else{
        res.send("Invalide password")
    }
}
else{
    res.send("no user with that email")
}

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