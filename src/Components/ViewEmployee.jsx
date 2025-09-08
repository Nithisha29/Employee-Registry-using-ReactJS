import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ViewEmployee = () => {
  let navigate = useNavigate();
  let {id}= useParams()
  let [employee,setEmployee]= useState(null)
  let fetchData=async()=>{
  let {data}=await axios.get(`http://localhost:3000/employee/${id}`)
  setEmployee(data)
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div id="view-page">
     {employee==null ? "Loading...": 
     <article id="view-article">
      <h2 >{employee.name}</h2>
      <h3>{employee.designation}</h3>
      <p>+91{employee.phone}</p>
      <p>{employee.email}</p>
      <p>{employee.dob}</p>
      <img src={employee.photo} alt={employee.name} className="employee-photo" />
      <button onClick={() => navigate("/")} id="btn-1" >Go to Homepage</button>
     </article>
     }
     {/* <button onClick={() => navigate("/")} id="btn1">Go to Homepage</button> */}

    </div>
    
  )
}

export default ViewEmployee