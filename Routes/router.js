const express = require("express");
const router = new express.Router();
const controllers = require('../Controllers/userControllers')
//
router.post("/user/register", controllers.userpost);
router.get("/user/getAllUsers", controllers.getUsers);
router.get("/user/singleuser/:id", controllers.getSingleuser);
router.delete("/user/deleteuser/:id", controllers.deleteuser);
router.put("/user/updateuser/:id", controllers.updateUser)

module.exports = router;