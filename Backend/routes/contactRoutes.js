import express from "express";
import saveContactForm from "../controllers/contactControllers.js";


const router = express.Router();

// Route to handle contact form submission
router.post("/submit", saveContactForm);

export default router;
// Compare this snippet from Backend/server.js:
// import express from 'express';