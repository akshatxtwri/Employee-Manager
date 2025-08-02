import path from "path";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const employee = await Employee.findById(userId);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const newLeave = new Leave({
      employeeId: employee._id, 
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();
    return res.status(201).json({ success: true, message: 'Leave request added successfully' });
  } catch (error) {
    console.error('Error in addLeave:', error);
    return res.status(500).json({ success: false, message: 'Internal server error in adding leave' });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    const leaves = await Leave.find({ employeeId: employee._id });

    if (!leaves || leaves.length === 0) {
      return res.status(404).json({ success: false, message: 'No leaves found for this employee' });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error('Error in getLeaves:', error);
    return res.status(500).json({ success: false, message: 'Internal server error in fetching leaves' });
  }
};


const getLeaves = async (req, res) => {
  try {
     
    const leaves = await Leave.find().populate(
      {
        path: 'employeeId',
        populate: [
          {path : 'department',
             select: 'dep_name'},
             {
              path: 'userId',
              select: 'name'
             }

          ]
      }
    );

    return res.status(200).json({ success: true, leaves }); 
  }

  catch (error) {
    console.error('Error in getLeaves:', error);
    return res.status(500).json({ success: false, message: 'Internal server error in fetching all leaves' });
  }}

  const  getLeaveDetails = async (req, res) => {
    try {
     
     const { id } = req.params;
    const leave = await Leave.findById({_id : id}).populate(
      {
        path: 'employeeId',
        populate: [
          {path : 'department',
             select: 'dep_name'},
             {
              path: 'userId',
              select: 'name , profileImage'
             }

          ]
      }
    );

    return res.status(200).json({ success: true, leave }); 
  }

    catch (error) {
      console.error('Error in getLeaveDetails:', error);
      return res.status(500).json({ success: false, message: 'Internal server error in fetching leave details' });
    }
  }

export { addLeave, getLeave ,getLeaves , getLeaveDetails};
