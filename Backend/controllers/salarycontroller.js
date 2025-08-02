import Employee from '../models/Employee.js';
import Salary from '../models/Salary.js';
import mongoose from 'mongoose';

const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Validate input
        if (!employeeId || basicSalary == null || allowances == null || deductions == null || !payDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const totalSalary = Number(basicSalary) + Number(allowances) - Number(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        res.status(201).json({ message: "Salary added successfully", salary: newSalary });
    } catch (error) {
        console.error("Error adding salary:", error);
        res.status(500).json({ message: "Salary add server error" });
    }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary;

    // Try direct match with employee _id
    salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId name');

    // If not found, try to match by userId through Employee
    if (!salary || salary.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }

      salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId name');
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("Error fetching salary:", error);
    res.status(500).json({ message: "Server error while fetching salary" });
  }
};

export { addSalary, getSalary };
