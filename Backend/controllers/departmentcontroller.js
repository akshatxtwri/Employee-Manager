import Department from "../models/Department.js"

const addDepartment = async (req , res) => {
  try {
      
    const {dep_name , description} = req.body;
    const newDepartment = new Department({
      dep_name,
      description,
    });

    await newDepartment.save();
    return res.status(200).json({success: true , department : newDepartment})

  } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getDepartments = async(req ,res) => {
    try{
        const departments = await Department.find();
        return res.status(200).json({success: true, departments})
    }
    catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    }

    const getDepartment = async (req,res)=>{
      try {

        const {id} = req.params;

        const department = await Department.findById({_id : id});

        return res.status(200).json({success: true, department})

        
      } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
 

    const updateDepartment = async (req, res) => {
      try {
        const {id} = req.params;
        const {dep_name, description} = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate({_id : id}, {dep_name, description}, {new: true});

        if(!updatedDepartment){
          return res.status(404).json({success: false, message: 'Department not found'})
        }

        return res.status(200).json({success: true, department: updatedDepartment})

      } catch (error) {d
          return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
    
const deleteDepartment = async (req,res) =>{
 try {
        const {id} = req.params;

        const deletedep = await Department.findByIdAndDelete({_id : id});

        if(!deletedep){
          return res.status(404).json({success: false, message: 'Department not found'})
        }

        return res.status(200).json({success: true, department: deletedep})

      } catch (error) {
          return res.status(500).json({ message: 'delte dep  Server Error' });
      }
  
}

export {addDepartment ,getDepartments,getDepartment , updateDepartment ,deleteDepartment}