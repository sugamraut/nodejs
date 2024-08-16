const { questions, users, answers } = require("../model")

const renderAskQuestionPage = (req,res)=>{
    res.render("questions/askQuestion")
}
const askQuestion = async (req,res)=>{

    const {title,description}  = req.body 
    console.log(req.body)
    console.log(req.file)
    const userId = req.userId 
    const fileName = req.file.filename
    if(!title || !description ){
        return res.send("Please provide title, description")
    }
    await questions.create({
        title, 
        description, 
        image : fileName,
        userId
    })
    res.redirect("/")
}

const getAllQuestion = async (req,res)=>{
    const data = await questions.findAll({
        include : [
            {
                model : users
            }
        ]
    })
}


const renderSingleQuestionPage = async (req,res)=>{
    const {id} = req.params 
    const data = await questions.findAll(
        {
            where : {
                id : id
            },
            include : [{
                model : users,
                attributes : ["username"]
            }]
        }
    )

    const answersData = await answers.findAll({
        where : {
            questionId : id 
        }, 
        include : [{
            model : users, 
            attributes : ['username']
        }]
    })
    res.render("./questions/singleQueston",{data,answers:answersData})
}
module.exports={renderSingleQuestionPage,getAllQuestion,askQuestion,renderAskQuestionPage}