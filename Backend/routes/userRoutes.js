import express from "express";
import {
  register,
  login,
  logout,
  updateUser,
  deleteUser,
  getAllUsers
  
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/allusers", getAllUsers);




export default router;
