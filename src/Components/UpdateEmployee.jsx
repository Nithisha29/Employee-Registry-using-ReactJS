import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const API_URL = "https://employee-registry-using-reactjs-1.onrender.com/employee";


const UpdateEmployee = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  let formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      phone: "",
      email: "",
      dob: "",
      photo: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .put(`${API_URL}/${id}`, values) // ✅ use API_URL
        .then(() => {
          toast.success("Updated Employee Successfully 🎉");
          resetForm();
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch((err) => console.log(err));
    },
  });

  let handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file); // ✅ fixed typo
    }
  };

  let fetchData = async () => {
    try {
      let { data } = await axios.get(`${API_URL}/${id}`); // ✅ use API_URL
      formik.setValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let { name, designation, phone, email, dob } = formik.values;
  let { handleChange, handleSubmit } = formik;

  return (
    <>
      <div id="bg">
        <form onSubmit={handleSubmit} id="form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your Name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="Enter your Designation"
            value={designation}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="phone">Phone No:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Enter your mobile no"
            value={phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="dob">Dob:</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={dob}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="photo">Photo:</label>
          <input type="file" name="photo" id="photo" onChange={handleImageChange} />
          <br />
          <br />
          <button type="submit">Update</button>
          <br />
          <br />
        </form>

        <ToastContainer />
      </div>

      <div id="btn">
        <button onClick={() => navigate("/")} id="btn-2">
          Go to homepage
        </button>
      </div>
    </>
  );
};

export default UpdateEmployee;








// import axios from "axios"
// import { useFormik } from "formik"
// import { useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import { ToastContainer,toast } from "react-toastify"

// const API_URL = "https://your-app-name.onrender.com/employees";


// const UpdateEmployee = () => {
//     let navigate = useNavigate()
//   let {id}=useParams()
//   let formik=useFormik({
//     initialValues:{
//       name:"",
//       designation:"",
//       phone:"",
//       email:"",
//       dob:"",
//       photo:"",
//     },
//     onSubmit:(details,{resetForm})=>{
//        axios.put(`http://localhost:3000/employees/${id}`, updatedEmployee)
//       axios.put(`http://localhost:3000/employee/${id}`,details)
     
//       resetForm()
//       toast.success("Updated Employee Successfully")
//       setTimeout(()=>{
//         navigate("/")
//       },4000)
//     }
//   })
//   let handleImageChange=(e)=>{
//     let file=e.target.files[0]
//     if(file){
//       let reader=new FileReader()
//       reader.onload=()=>{
//         formik.setFieldValue("photo",reader.result)
//       }
//       reader,readAsDataURL(file)
//     }
//   }
//   let fetchData=async()=>{
//     let {data}=await  axios.get(`http://localhost:3000/employees/${id}`)
//      axios.get(`http://localhost:3000/employee/${id}`)
    
    
//     formik.setValues(data)
//   }
//   useEffect(()=>{
//     fetchData()
//   },[])
  
//   let {name,designation,phone,email,dob}=formik.values
//   let {handleChange,handleSubmit}=formik
//   return (
//    <>
//     <div id="bg">
//       <form onSubmit={handleSubmit} id="form">
//         <label htmlFor="name">Name:</label>
//         <input type="text" name="name" id="name" placeholder="Enter your Name" value={name} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="designation">Designation:</label>
//         <input type="text" name="designation" id="designation" placeholder=" Enter your Designation" value={designation} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="phone">Phone No:</label>
//         <input type="tel" name="phone" id="phone" placeholder="Enter your mobile no" value={phone} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="email">Email:</label>
//         <input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="dob">Dob:</label>
//         <input type="date" name="dob" id="dob" value={dob} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="photo">Photo:</label>
//         <input type="file" name="photo" id="photo" onChange={handleImageChange} />
//         <br /><br />
//         <button >Update</button>
//         <br /><br />

//       </form>
      
//          <ToastContainer />
//      </div>

//     <div id="btn">

//       <button onClick={() => navigate("/")} id="btn-2">Go to homepage</button>

//     </div>
     
//     </>
//   )
// }

// export default UpdateEmployee