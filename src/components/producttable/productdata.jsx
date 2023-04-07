import "./product.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Productdata = () => {

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
       Product List

        <Link to="/products/new" className="link px-3"><AddIcon/>Add Product</Link>
        {/* {Role === "user"  ? <Link to="/users/new" className="link">Add New User</Link> : <Link to="/users/new" className="link"> New User</Link> } */}
       
      </div>
     
 
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                {/* <th scope="col">UserID</th> */}
                <th scope="col">ProductID</th>
                <th scope="col">Vendor</th>
                <th scope="col">Total Purchased</th>
                <th scope="col">Total Received</th>
                <th scope="col">Amount Paid</th>
              </tr>
            </thead>
            {mydata.map((post)=>{
            //      return (
            // <tbody>
            //   <tr key={post.UserID}>
            //     {/* <td>{post.UserID}</td> */}
            //     <td>{post.EmailID}</td>
            //     <td>{post.Password}</td>
            //     <td>{post.Role}</td>
            //     <td>
            //       <button
            //         onClick={() => navigate(`/users/viewuser/${post.UserID}`)}
            //         className='btn btn-primary'>view
            //       </button>
            //     </td>
            //     <td>
            //       <button
            //         onClick={() => navigate(`/users/edituser/${post.UserID}`)}
            //         className='btn btn-warning'>Edit
            //       </button>
            //     </td>
            //     <td>
            //       <button
            //        onClick={() => handleuserDelete(post.UserID)}
            //         className='btn btn-danger'>Delete
            //       </button>
            //     </td>
            //   </tr>
            // </tbody>);
            })}
        </table>
        </div>
      </div>
    

    </div>
  );
};

export default Productdata;
