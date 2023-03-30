import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const New = ({   inputs, title }) => {
  const navigate = useNavigate();
  // const [file, setFile] = useState("");
  
  const [userData, setUserdata] = useState({
        
        UserID: '',
        EmailID: '',
        Password: '',
        Role: '',
        UserStatus: true
})
const handleChange = (event) => {
  setUserdata({
    ...userData,
    [event.target.name]: event.target.value
  });
};

const handlAdduser = async (event) => {
  event.preventDefault();
  try{
    let res = await axios.post('http://127.0.0.1:8000/api/useradd/',userData );
    navigate('/users')
  }
  catch(error){
      alert('Add fail')
  }
}

useEffect (()=>{
  handlAdduser();
},{})

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top d-flex justify-content-between align-items-center ">
          <h1>Add new user </h1>
          <Link to="/users" className="link">
              <button className="btn btn-warning">
              Back
              </button>
          </Link>
        </div>
      
        <div className="bottom">
         
          <div className="right">
            <form>
            <div class="row">
                <div className="formInput col-6">
                <label for="role">User Name</label>
                <input type="text" name="EmailID" value={userData.EmailID} onChange={handleChange} placeholder="user name"/>
                </div>
                <div className="formInput col-6">
                <label for="role">User Role</label>
                    <select id="role"  name="Role" value={userData.Role} onChange={handleChange}>
                      <option value="admin">admin</option>
                      <option value="user">User</option>
                    </select>
                </div>
                <div className="formInput col-6 pt-5">
                <label for="role">Password</label>
                <input type="text" name="Password" value={userData.Password} onChange={handleChange} placeholder="password"/>
                </div>
                <div className="formInput col-6 pt-5">
                <label for="role">Confirm Password </label>
                <input type="text"  placeholder="Confirm Password"/>
                </div>
                <div className="col-6 pt-5">
                <button onClick={handlAdduser} >Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
