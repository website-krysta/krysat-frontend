import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Datatable = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  let [mydata , setmydata] = useState([]);
  const getApidata = async ()=>{
     try{
      
      let res = await axios.get('https://saimythribuilders.com/api/user/');
      setmydata(res.data)
      console.log(mydata )
     }
     catch(error){
      console.log(error)
     }
  }
  const handleuserDelete =  async(id) => {
   
     try{
      await axios.delete(`https://saimythribuilders.com/api/deleteuser/${id}/`)
      navigate('/users')
     }
     catch(error){
      console.log(error);
      
     }
   
  
  };

// delet record 



useEffect(() =>{
  getApidata();
  
},{});
debugger
const userData = JSON.parse(sessionStorage.getItem('userData'));
let Role = 'user'
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Users

        <Link to="/users/new" className="link">Add New User</Link>
        {/* {Role === "user"  ? <Link to="/users/new" className="link">Add New User</Link> : <Link to="/users/new" className="link"> New User</Link> } */}
       
      </div>
     
 
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">UserID</th>
                <th scope="col">EmailID</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {mydata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.UserID}>
                <td>{post.UserID}</td>
                <td>{post.EmailID}</td>
                <td>{post.Password}</td>
                <td>{post.Role}</td>
                <td>
                  <button
                    onClick={() => navigate(`/users/viewuser/${post.UserID}`)}
                    className='btn btn-primary'>view
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/users/edituser/${post.UserID}`)}
                    className='btn btn-warning'>Edit
                  </button>
                </td>
                <td>
                  <button
                   onClick={() => handleuserDelete(post.UserID)}
                    className='btn btn-danger'>Delet
                  </button>
                </td>
              </tr>
            </tbody>);
            })}
        </table>
        </div>
      </div>
    

    </div>
  );
};

export default Datatable;
