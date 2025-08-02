
import express from 'express';
import { login , verify } from '../controllers/authcontroller.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router  = express.Router();


console.log("auth.js is loaded");

router.post('/login', (req, res) => {
  console.log("POST /login hit");
  return login(req, res); // your actual controller
});

router.post('/login' , login) 
router.get('/verify',authMiddleware , verify)

export default router;
 