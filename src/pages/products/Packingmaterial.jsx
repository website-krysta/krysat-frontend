import "./productlist.scss";
import './addproduct.css' 
import AddPacking from "../products/packingpop/AddPacking"
import Addvendor from "../products/packingpop/Addvendor"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Rawmaterialform = () => {
  const navigate = useNavigate();

  
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


useEffect (()=>{
  handlAdduser();
},{})





  return (
    <div className="new">
            <div class="row">
              <h1 className="text-center text-primary pt-4">Add Packing Material </h1>
              <div className="col-md-8 addproduct_form  pb-5">
                
                <form>
                  <div className="formInput1 col-8">
                    <label for="role">Raw Material</label>
                    <select id="role" name="Role" value={userData.Role} onChange={handleChange}>
                      <option value="admin">material 1</option>
                      <option value="user">material 1</option>
                    </select>
                  </div>
                  <div className="formInput1 col-8">
                    <label for="role">Vendor</label>
                    <select id="role" name="Role" value={userData.Role} onChange={handleChange}>
                      <option value="admin">vendor 1</option>
                      <option value="user">vendor 2</option>
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
                  <AddPacking/>
                </div>
                <div className="pt-5">
                  <Addvendor />
                </div>
              </div>
            </div>
          </div>
     
  );
};

export default Rawmaterialform;
