import "./login.scss"
import './login.css'
import logo from './images/logo.png';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import axios from "../../api/axios";
       
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
      debugger;
      let res = await axios.post('api/user/',userData );
      localStorage.setItem('userData', JSON.stringify(res.data));
      if (res.data.Role == 'admin'){
        navigate('/users', { replace: true })
     }else{
      navigate('/invoice', { replace: true })
     }
         
    }
    catch(error){
        alert('Invalid credentials. Please check your username and password and try again')
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