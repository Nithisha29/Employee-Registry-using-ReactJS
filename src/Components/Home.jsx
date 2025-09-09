import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://employee-registry-using-reactjs-1.onrender.com/employee";


const Home = () => {
  let [details, setDetails] = useState(null);
  let navigate = useNavigate();

  let fetchData = async () => {
    try {
      let { data } = await axios.get(API_URL); // ✅ use API_URL
      setDetails(data);
    } catch (err) {
      console.log("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // ✅ use API_URL
      // refresh data instead of reload (better UX)
      fetchData();
    } catch (err) {
      console.log("Error deleting employee:", err);
    }
  };

  return (
    <section id="home_page">
      <nav>
        <h1>Employee Registry 💻</h1>
        <button onClick={() => navigate("./create-employee")}>
          Create Employee 🧑‍💼➕
        </button>
      </nav>
      <main>
        {details == null ? (
          "Loading..."
        ) : (
          details.map((employee) => {
            return (
              <article key={employee.id} className="employee-card">
                <h1>{employee.name}</h1>
                <p>{employee.email}</p>
                <p>+91-{employee.phone}</p>
                <p>{employee.dob}</p>
                <h2>{employee.designation}</h2>
                <img
                  src={employee.photo}
                  alt={employee.name}
                  height="200"
                  width="150"
                />
                <br />
                <br />
                <aside>
                  <button onClick={() => navigate(`/view-employee/${employee.id}`)}>
                    View
                  </button>
                  <button onClick={() => navigate(`/update-employee/${employee.id}`)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </aside>
              </article>
            );
          })
        )}
      </main>
    </section>
  );
};

export default Home;










// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"

// const API_URL = "https://your-app-name.onrender.com/employees";

// const Home = () => {
//   let [details,setDetails] = useState(null)
//   let navigate =useNavigate()
//   let fetchData = async()=>{
//       let {data} = await axios.get("http://localhost:3000/employees")
//       axios.get("http://localhost:3000/employee")
      

//       setDetails(data)
//    }
//    useEffect(()=>{
//       fetchData()
//    },[])
//   let handleDelete=(id)=>{
// axios.delete(`http://localhost:3000/employees/${id}`)
//     axios.delete(`http://localhost:3000/employee/${id}`)
//     location.reload()
//   }
//   return (
//     <section id="home_page">
//       <nav>
//         <h1>Employee Registry💻</h1>
//         <button onClick={()=>navigate("./create-employee")}>Create Employee🧑‍💼➕</button>
//       </nav>
//       <main>
//         {details == null ? "Loading..." : details.map((employee)=>{
//            return <article key={employee.id} className="employee-card">
//             <h1>{employee.name}</h1>
//             <p>{employee.email}</p>
//             <p>+91-{employee.phone}</p>
//             <p>{employee.dob}</p>
//             <h2>{employee.designation}</h2>
//             <img src={employee.photo} alt={employee.name} height="200" width="150"/>
//             <br /><br />
//             <aside>
//             <button onClick={()=>navigate(`/view-employee/${employee.id}`)}>View</button>  <button onClick={()=>navigate(`/update-employee/${employee.id}`)}>Update</button>  <button onClick={()=>handleDelete(employee.id)}>Delete</button>
//             </aside>
//            </article>
//         })}
//       </main>
//     </section>
//   )
// }

// export default Home