import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import CreateIcon from '@mui/icons-material/Create';
import PreviewIcon from '@mui/icons-material/Preview';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';


const Datatable = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  let [mydata , setmydata] = useState([]);
  const getApidata = async ()=>{
     try{
      
      let res = await axios.get('/api/user/');
      setmydata(res.data)
      console.log(mydata )
     }
     catch(error){
      console.log(error)
     }
  }
  const handleuserDelete =  async(id) => {
   
     try{
      await axios.post(`/api/deleteuser/${id}/`)
      const updateuser = mydata.filter(user => user.UserID !== id);
      setmydata(updateuser);
              
     }
     catch(error){
      console.log(error);
      
     }
   
  
  };

// delet record 



useEffect(() =>{
  getApidata();
 
},{});

const userData = JSON.parse(sessionStorage.getItem('userData'));
let Role = 'user'
  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Users

        <Link to="/users/new" className="link">Add New User</Link>
       
       
      </div>
     
 
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">EmailID</th>
                <th scope="col">Password</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
                <th scope="col">Actions</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {mydata.map((post)=>{
                 return (
            <tbody>
              <tr key={post.UserID}>
                <td>{post.EmailID}</td>
                <td>{post.Password}</td>
                <td>{post.Role}</td>
                <td>
                  <button
                    onClick={() => navigate(`/users/viewuser/${post.UserID}`)}
                    className='btn btn-primary'><PreviewIcon />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/users/edituser/${post.UserID}`)}
                    className='btn btn-warning'><CreateIcon/>
                  </button>
                </td>
                <td>
                  <button
                   onClick={() => handleuserDelete(post.UserID)}
                    className='btn btn-danger'><RestoreFromTrashIcon />
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
