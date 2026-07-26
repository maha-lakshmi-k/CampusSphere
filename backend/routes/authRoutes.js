const express=require("express");

const router=express.Router();

const{ register, login, profile, me, deleteAccount } = require("../controllers/authController");
const{ verifyToken }=require("../middlewares/authMiddleware");
router.post("/register",register);
router.post("/login",login);
router.get("/profile", verifyToken, profile);
router.get("/me",verifyToken,me);
router.delete("/delete-account",verifyToken,
deleteAccount
);

module.exports=router;