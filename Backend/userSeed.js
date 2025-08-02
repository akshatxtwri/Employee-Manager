
import User from "./models/User.js";
import bcrypt from "bcrypt";
import dbConnect from "./databse/db.js";
//we use const require but we have set module so we can use like this 

const userRegister = async() => {
    dbConnect()
    try {
        const hashPassword =  await bcrypt.hash("admin" ,10)
        const newUser = new User({
            name: "Admin",
            email:"admin@gmail.com",
            password : hashPassword,
            role: "admin",
        })

        await newUser.save();
        
    } catch (error) {
        console.error("Error during user registration:", error);
    }
}

userRegister();