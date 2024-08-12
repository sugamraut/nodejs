const { users, questions } = require('../model/index')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
exports.renderHomePage = async (req,res)=>{
    const data = await questions.findAll(
        {
            include : [{
                model : users,
                attributes : ["username"]
            }]
        }
    ) // return array 
    console.log(data)
    res.render('home.ejs',{data})
}
exports.renderRegisterpage=(req,res)=>{
    res.render("auth/register")
}
exports.handelRegister=async(req,res)=>{
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
}

exports.renderLoginPage=(req,res)=>{
    res.render('auth/login')
}

//handel Login
exports.handelLogin= async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.send("please provide email,password")
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
            const token=jwt.sign({id:data.id},'Raut',{
                expiresIn:"30d"
            })
            res.cookie('jwtToken',token)
           // console.log(token)
            res.send("Logged in success")
        }else{
            res.send("Invalide password")
        }
    }
    else{
        res.send("no user with that email")
    }
    
    }

