const { handleAnswer } = require("../controllers/answerController")
const { isAuthenticated } = require("../middleware/isAuthenticate")

const router = require("express").Router()

//router.route("/:id").post(isAuthenticated,handleAnswer)
router.post("./:id",isAuthenticated,handleAnswer)


module.exports = router 