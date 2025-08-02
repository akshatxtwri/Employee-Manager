import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave ,  getLeave ,getLeaves , getLeaveDetails} from '../controllers/leavecontroller.js';


const router = express.Router();

router.post('/add', authMiddleware, addLeave); 
router.get('/:id' , authMiddleware , getLeave);
router.get('/', authMiddleware, getLeaves);
router.get('/detail/:id', authMiddleware, getLeaveDetails);




export default router;
