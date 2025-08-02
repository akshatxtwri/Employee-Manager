import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addemployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  upload ,
  fetchEmployeesByDepId
} from '../controllers/employeeController.js';

const router = express.Router();

console.log(" employee.js route file loaded");
router.get('/test', (req, res) => {
  res.json({ message: ' Employee route working' });
});

router.post('/', authMiddleware, upload.single('image'), addemployee);

router.get('/department/:id' , authMiddleware , fetchEmployeesByDepId);



router.get('/', authMiddleware, getEmployees);


router.get('/:id', authMiddleware, getEmployee);


router.put('/:id', authMiddleware, updateEmployee);


export default router;
