import axios from 'axios'
import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name : "S.no",
        selector: (row) => row.sno

    },

    {
        name: "Department Name" ,
        selector:(row) => row.dep_name,
        sortable : true

    },
    {
        name : "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({DepId , onDepartmentDelete}) =>{
    const navigate = useNavigate()

    const handleDelete = async(id) => {
        const confirm = window.confirm("Do you want to delete ")
      if(confirm){

        try{
            const response = await axios.delete(`http://localhost:4000/api/depatment/${id}`,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            if(response.data.success){
                onDepartmentDelete(id)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    }
    return (
        <div className="flex space-x-3 ">
            <button className="px-3 py-1 bg-teal-600 text-white rounded m"
            onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
            >
                Edit
             </button>
             <button
             onClick={() => handleDelete(DepId)}
             className="px-3 py-1 bg-red-600 text-white rounded">
             Delete
             </button>
        </div>
    )
}