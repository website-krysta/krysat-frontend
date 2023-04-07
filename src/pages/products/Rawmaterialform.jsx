import "./productlist.scss";
import './addproduct.css' 
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import AddIcon from "@mui/icons-material/Add";
// import StoreIcon from "@mui/icons-material/Store";
import Newrawmeterial from "../products/Newrawmeterial"
import Newvendor from "../products/Newvendor"
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Rawmaterialform = () => {
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
      alert('User adding fail please try agian !')
  }
}

// get rameterial form data
const [options, setOptions] = useState([]);
const getmeterialdata = async ()=>{
   try{
    
    let res = await axios.get('http://127.0.0.1:8000/api/meterial/list/');
    setOptions(res.data)
    
   }
   catch(error){
    console.log(error)
   }
}

// get vendor form data
const [voptions, setvOptions] = useState([]);
const getvendordata = async ()=>{
   try{
    
    let res = await axios.get('http://127.0.0.1:8000/api/vendor/list/');
    setvOptions(res.data)
    
   }
   catch(error){
    console.log(error)
   }
}


useEffect (()=>{
//   handlAdduser();
  getmeterialdata();
  getvendordata();
},{})

    
  return (
      <div className="new">
          <div class="row">
              <h1 className="text-center text-primary pt-4">Add Raw Material</h1>
              <div className="col-md-8 addproduct_form  pb-5">

                  <form>
                      <div className="formInput1 col-8">
                          <label for="role">Raw Material</label>
                          <select id="role" name="Role" value={options} onChange={(event) => setOptions(event.target.value)}>
                          {options.map((option) => (
                              <option value="option.MaterialCode">{option.MaterialCode}</option>
                          ))}
                          </select>
                      </div>
                      <div className="formInput1 col-8">
                          <label for="role">Vendor</label>
                          <select id="role" name="vendorlist" value={voptions} onChange={(event) => setvOptions(event.target.value)}>
                          {voptions.map((voption) => (
                              <option value="voption.VendorCode">{voption.VendorCode}</option>
                          ))}
                          </select>
                      </div>

                      <div className="formInput col-8">
                          <label>Total Purchased Qty</label>
                          <input type="password" name="Password" value={userData.Password} onChange={handleChange} placeholder="total purchased qty" />
                      </div>

                      <div className="formInput col-8">
                          <label >Total Recevied Qty </label>
                          <input type="password2" placeholder="total recevied qty" />
                      </div>
                      <div className="formInput col-8">
                          <label >Amount Paid</label>
                          <input type="text" name="EmailID" value={userData.EmailID} onChange={handleChange} placeholder="amount paid" />
                      </div>
                      <div className="formInput col-12 ">
                          <button onClick={handlAdduser} >Add Product</button>
                      </div>
                  </form>
              </div>
              <div className="col-md-4 pt-5 ">
                  <div className="pt-5">
                      <Newrawmeterial />
                  </div>
                  <div className="pt-5">
                      <Newvendor />
                  </div>
              </div>
          </div>
      </div>

  );
};

export default Rawmaterialform;
