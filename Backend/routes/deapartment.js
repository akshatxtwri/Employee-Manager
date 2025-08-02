import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartment
} from '../controllers/departmentcontroller.js';

const router = express.Router();

// CREATE
router.post('/', authMiddleware, addDepartment);

// ✅ FIXED: Get all departments
router.get('/', authMiddleware, getDepartments);

// READ ONE
router.get('/:id', authMiddleware, getDepartment);

// UPDATE
router.put('/:id', authMiddleware, updateDepartment);

// DELETE
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;
