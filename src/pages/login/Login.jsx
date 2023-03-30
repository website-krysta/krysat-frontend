import "./login.scss"
import './login.css'
import logo from './images/logo.png';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import axios from "axios";
// import { getuserlist } from "../../components/apiist/Api";


const Login = () => {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    EmailID: '',
    Password: ''
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      let res = await axios.post('http://43.205.253.201:8012/api/user/',userData );
      navigate('/users')
    }
    catch(error){
        alert('loging fail')
    }
    
  }

  useEffect(()=>{
    handleSubmit();
  },[]);

  
  return (
    <div className="main-login-sec">
      
      <div className="login-frame shadow-lg p-5 mb-5 bg-body rounded">
      <div className="App-logo">
      <img src={logo}  alt="logo" />
      </div>
        <form id="login-form" >
          <div className="mb-3">
      
            <input type="email" name="EmailID" value={userData.EmailID} onChange={handleChange} className="form-control pt-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="UserName" required />
           
          </div>
          <div className="mb-3">
            <input type="password" name="Password" value={userData.Password} onChange={handleChange} className="form-control pt-3" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember Me</label>
          </div>
          <div className="center-btn">
          <button type="submit" onClick={handleSubmit}  className="btn login-btn text-center px-5">Submit</button>
          </div>
         
        </form>
      </div>

    </div>
    
      )
}

export default Login