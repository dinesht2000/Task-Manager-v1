const express=require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

const router=express.Router();

router.use(protect);

router.get("/",adminOnly,getUsers);
router.get("/:id",getUserById);


module.exports=router;