import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import dbConnect from './databse/db.js';
import dotenv from 'dotenv';
import departmentrouter from './routes/deapartment.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
//

dotenv.config(); 

dbConnect(); // Connect to the database
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('Public/uploads')); 

console.log("Loading auth routes...");
app.use('/api/auth', authRouter);
console.log("Auth routes mounted at /api/auth");

app.use('/api/department', departmentrouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);


app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})


