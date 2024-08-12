const { questions } = require("../model")

exports.renderAskQuestionPage=(req,res)=>{
    res.render("question/askQuestion")
}

exports.askQuestion= async(req,res)=>{
    
const {title,description}= req.body 
console.log(req.body)
console.log(req.file)
const userId=req.userId
const filename= req.file.filename
if(!title||!description){
    return res.send("Please provide title,description")
}
await questions.create({
  title,
  description,
  image : filename,
  userId
})
res.redirect("/")
}

exports.getAllquestion =async(res,req)=>{
    const data =await questions.findAll({
        include :[
            {
                module:users
            }
        ]
    })
}