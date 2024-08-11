const { renderAskQuestionPage,askQuestion } = require("../controller/questioncontroller")

const router= require("express").Router()
const{multer,storage}=require("../middleware/multerConfig")
const uplode=multer({storage:storage})

router.route("/askquestion").get(renderAskQuestionPage).post(uplode.single('image'),askQuestion)//uploade.array used for input multipuly array

module.exports=router