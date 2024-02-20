const express = require("express");
const router = new express.Router();
const controllers = require('../Controllers/userControllers')
//
router.post("/user/register", controllers.userpost);

module.exports = router;