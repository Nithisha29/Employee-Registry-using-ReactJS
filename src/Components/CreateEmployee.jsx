import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API_URL = "https://employee-registry-using-reactjs-1.onrender.com/employee";


const CreateEmployee = () => {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      phone: "",
      email: "",
      dob: "",
      photo: "",
    },
    validate: (values) => {
      let errors = {};

      if (!values.name) errors.name = "Name is required";
      if (!values.designation) errors.designation = "Designation is required";

      if (!values.phone) {
        errors.phone = "Phone number is required";
      } else if (values.phone.length < 10) {
        errors.phone = "Phone number must be at least 10 digits";
      } else if (values.phone.length > 10) {
        errors.phone = "Phone number cannot exceed 10 digits";
      }

      if (!values.email) errors.email = "Email is required";
      if (!values.dob) errors.dob = "Date of Birth is required";
      if (!values.photo) errors.photo = "Photo is required";

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post(API_URL, values)
        .then(() => {
          toast.success("Employee Created Successfully 👍🥳");
          resetForm();
          setTimeout(() => navigate("/"), 4000);
        })
        .catch((err) => console.log(err));

      console.log(values);
    },
  });

  let handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            required
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
            required
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
            required
          />
          {formik.errors.phone && (
            <div style={{ color: "red" }}>{formik.errors.phone}</div>
          )}
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
          <input
            type="file"
            name="photo"
            id="photo"
            onChange={handleImageChange}
            required
          />
          <br />
          <br />
          <input type="submit" id="submit" />
          <br />
          <br />
        </form>

        <ToastContainer />
      </div>

      <div id="btn">
        <button onClick={() => navigate("/")} id="create-btn">
          Go to homepage
        </button>
      </div>
    </>
  );
};

export default CreateEmployee;







// import { useFormik } from "formik"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';

// const API_URL = "https://your-app-name.onrender.com/employees";
  

// const CreateEmployee = () => {
//   let navigate = useNavigate()
//   let formik = useFormik({
//   initialValues: {
//     name: "",
//     designation: "",
//     phone: "",
//     email: "",
//     dob: "",
//     photo: "",
//   },
//   validate: values => {
//     let errors = {};

    
//     if (!values.name) errors.name = "Name is required";
//     if (!values.designation) errors.designation = "Designation is required";
//     if (!values.phone) {
//       errors.phone = "Phone number is required";
//     } else if (values.phone.length < 10) {
//       errors.phone = "Phone number must be at least 10 digits";
//     } else if (values.phone.length > 10) {
//       errors.phone = "Phone number cannot exceed 10 digits";
//     }

//     if (!values.email) errors.email = "Email is required";
//     if (!values.dob) errors.dob = "Date of Birth is required";
//     if (!values.photo) errors.photo = "Photo is required";

//     return errors;
//   },
//   onSubmit: (values, { resetForm }) => {
//      axios.post("http://localhost:3000/employees", values)
//      axios.post("http://localhost:3000/employee", values)
//       .then(() => {
//         toast.success("Employee Created Successfully👍🥳");
//         resetForm();
//         setTimeout(() => navigate("/"), 4000);
//       })
//       .catch(err => console.log(err));

//     console.log(values);
//   }
// });


//   let handleImageChange = (e) => {
//     let file = e.target.files[0]
//     if (file) {
//       let reader = new FileReader()
//       reader.onload = () => {
//         formik.setFieldValue("photo", reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   let { name, designation, phone, email, dob, photo } = formik.values
//   let { handleChange, handleSubmit } = formik
//   return (
//     <>
//     <div id="bg">
//       <form onSubmit={handleSubmit} id="form">
//         <label htmlFor="name">Name:</label >
//         <input type="text" name="name" id="name" placeholder="Enter your Name" value={name} onChange={handleChange} required />
//         <br /><br />
//         <label htmlFor="designation">Designation:</label>
//         <input type="text" name="designation" id="designation" placeholder=" Enter your Designation" value={designation} onChange={handleChange} required />
//         <br /><br />
//         <label htmlFor="phone">Phone No:</label>
//         <input type="tel" name="phone" id="phone" placeholder="Enter your mobile no" value={formik.values.phone} onChange={formik.handleChange}  required />
//         {formik.errors.phone && <div style={{ color: "red" }}>{formik.errors.phone}</div>}
//         <br /><br />
//         <label htmlFor="email">Email:</label>
//         <input type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="dob">Dob:</label>
//         <input type="date" name="dob" id="dob" value={dob} onChange={handleChange} />
//         <br /><br />
//         <label htmlFor="photo">Photo:</label>
//         <input type="file" name="photo" id="photo" onChange={handleImageChange} required />
//         <br /><br />
//         <input type="submit" id="submit"/>
//         <br /><br />

//       </form>
      
//          <ToastContainer />
//      </div>

//     <div id="btn">

//       <button onClick={() => navigate("/")} id="create-btn">Go to homepage</button>

//     </div>
     
//     </>

//   )
// }

// export default CreateEmployee 




// import { useFormik } from "formik"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
  

// const CreateEmployee = () => {
//   let navigate = useNavigate()
//   let formik = useFormik({
//     initialValues: {
//       name: "",
//       designation: "",
//       phone: "",
//       email: "",
//       dob: "",
//       photo: "",
//     },
//     onSubmit: (details, { resetForm }) => {
//       axios.post("http://localhost:3000/employee", details)
//       resetForm()
//       toast.success("Employee Created Successfully👍🥳")
//       setTimeout(() => {
//         navigate("/")
//       }, 4000)
//       console.log(details);
//     }
//   })
//   let handleImageChange = (e) => {
//     let file = e.target.files[0]
//     if (file) {
//       let reader = new FileReader()
//       reader.onload = () => {
//         formik.setFieldValue("photo", reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   let { name, designation, phone, email, dob, photo } = formik.values
//   let { handleChange, handleSubmit } = formik
//   return (
//     <>
//     <div id="bg">
//       <form onSubmit={handleSubmit} id="form">
//         <label htmlFor="name">Name:</label >
//         <input type="text" name="name" id="name" placeholder="Enter your Name" value={name} onChange={handleChange}  import { useFormik } from "formik"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
  

// const CreateEmployee = () => {
//   let navigate = useNavigate()
//   let formik = useFormik({
//     initialValues: {
//       name: "",
//       designation: "",
//       phone: "",
//       email: "",
//       dob: "",
//       photo: "",
//     },
//     onSubmit: (details, { resetForm }) => {
//       axios.post("http://localhost:3000/employee", details)
//       resetForm()
//       toast.success("Employee Created Successfully👍🥳")
//       setTimeout(() => {
//         navigate("/")
//       }, 4000)
//       console.log(details);
//     }
//   })
//   let handleImageChange = (e) => {
//     let file = e.target.files[0]
//     if (file) {
//       let reader = new FileReader()
//       reader.onload = () => {
//         formik.setFieldValue("photo", reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   let { name, designation, phone, email, dob, photo } = formik.values
//   let { handleChange, handleSubmit } = formik
//   return (
//     <>
//     <div id="bg">
//       <form onSubmit={handleSubmit} id="form">
//         <label htmlFor="name">Name:</label >
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
//         <input type="submit" id="submit"/>
//         <br /><br />

//       </form>
      
//          <ToastContainer />
//      </div>

//     <div id="btn">

//       <button onClick={() => navigate("/")} id="create-btn">Go to homepage</button>

//     </div>
     
//     </>

//   )
// }

// export default CreateEmployee/>
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
//         <input type="submit" id="submit"/>
//         <br /><br />

//       </form>
      
//          <ToastContainer />
//      </div>

//     <div id="btn">

//       <button onClick={() => navigate("/")} id="create-btn">Go to homepage</button>

//     </div>
     
//     </>

//   )
// }

// export default CreateEmployee