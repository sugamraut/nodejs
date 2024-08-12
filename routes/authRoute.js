const { handelRegister, renderRegisterpage, handelLogin, renderLoginPage } = require("../controller/authController")

const router=require("express").Router()

router.route("/register").post(handelRegister).get(renderRegisterpage)
router.route("/login").post(handelLogin).get(renderLoginPage)

module.exports=router

    //rest api
/*
/getBlogs-get
/singleblog/:id-get
/deleteblog/:id-delete

*/