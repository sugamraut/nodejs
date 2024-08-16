const { renderAskQuestionPage,askQuestion, renderSingleQuestionPage } = require("../controllers/questionController")
const { isAuthenticated } = require("../middleware/isAuthenticate")

const router= require("express").Router()
const{multer,storage}=require("../middleware/multerConfig")
const uplode=multer({storage:storage})

//router.route("/askquestion").get(isAuthenticated,renderAskQuestionPage).post(isAuthenticated, uplode.single('image'),askQuestion)//uploade.array used for input multipuly array
//router.route("/question/:id").get(renderSingleQuestionPage)
router.get("/question/:id",renderSingleQuestionPage)
router.get("/askquestion",renderAskQuestionPage)
//router.get("/askquestion",isAuthenticated)
router.post("/askquestion",isAuthenticated,uplode.single('image'),askQuestion)
module.exports=router