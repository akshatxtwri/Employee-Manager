import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// For __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Correct multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'Public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ Add Employee
const addemployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeID,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : ""
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
            employeeID,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary
    });

    await newEmployee.save();

    return res.status(200).json({ success: true, message: "Employee created successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate('userId', { password: 0 })
      .populate("department");

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ message: 'Internal employees Server Error' });
  }
};

// Get Single Employee
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
     employee = await Employee.findById(req.params.id)
      .populate('userId', { password: 0 })
      .populate("department");
    
      if(!employee){
      employee =  await Employee.findOne({userId : id})
      .populate('userId', { password: 0 })
      .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({ message: 'Internal employee Server Error' });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndUpdate(user._id, { name });
    await Employee.findByIdAndUpdate(id, {
      maritalStatus,
      designation,
      salary,
      department
    });

    return res.status(200).json({ success: true, message: "Employee updated" });

  } catch (error) {
    return res.status(500).json({ message: 'Internal updateEmployee Server Error' });
  }
};

 const fetchEmployeesByDepId = async (req, res) => {
  try {
    const departmentId = req.params.id;

    const employees = await Employee.find({ department: departmentId });

    res.json({ success: true, employees });
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addemployee, upload, getEmployees, getEmployee, updateEmployee , fetchEmployeesByDepId };
