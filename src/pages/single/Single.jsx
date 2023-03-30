import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import axios from "axios";



const Single = () => {
  const { userId } = useParams();
  const [userData, setUserdata] = useState({
    UserID: '',
    EmailID: '',
    Password: '',
    Role: '',
    UserStatus: true
  });
  const getUserdata = async ()=>{
    let id = 13;
    try{
     debugger
     let res = await axios.get(`http://127.0.0.1:8000/api/userget/${userId}/`);
     setUserdata(res.data)
    
    }
    catch(error){
     console.log(error)
    }
 }

 useEffect (()=>{
  getUserdata()
  
},{})

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userData.UserID}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData.EmailID}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Password</span>
                  <span className="itemValue">{userData.Password}</span>
                </div>
               
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{userData.Role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
