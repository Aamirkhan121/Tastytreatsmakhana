import express from 'express';
import getAbout from '../controllers/aboutControllers.js';


const router = express.Router();
router.get('/', getAbout);

export default router;
