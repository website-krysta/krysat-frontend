import "./productlist.scss";
import './addproduct.css' 
import AddProduct from "../products/productpop/AddProduct"
import AddProductvendor from "../products/productpop/Addvendor"

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

// get rameterial form data
const [options, setOptions] = useState([]);
const getmeterialdata = async ()=>{
   try{
    
    let res = await axios.get('https://saimythribuilders.com/api/meterial/lis/');
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
    
    let res = await axios.get('https://saimythribuilders.com/api/vendor/list/');
    setvOptions(res.data)
    
   }
   catch(error){
    console.log(error)
   }
}



useEffect (()=>{
//   handlAdduser();
getmeterialdata()
},[])


  return (
    <div className="new">
            <div class="row">
              <h1 className="text-center text-primary pt-4">Add Product </h1>
              <div className="col-md-8 addproduct_form  pb-5">
                
              <form>
                      <div className="formInput1 col-8">
                          <label for="role">Products</label>
                          <select id="role" name="Role" value={options} onChange={(event) => setOptions(event.target.value)}>
                          <option value="">-- select product --</option>
                          {options.map((option) => (
                            
                              <option value="option.MaterialCode">{option.MaterialCode}</option>
                          ))}
                          </select>
                      </div>
                      <div className="formInput1 col-8">
                          <label for="role">Vendor</label>
                          <select id="role" name="vendorlist" value={voptions} onChange={(event) => setvOptions(event.target.value)}>
                          <option value="">-- select vendor --</option>
                          {voptions.map((voption) => (
                              <option value="voption.VendorCode">{voption.VendorCode}</option>
                          ))}
                          </select>
                      </div>
                      <div className="formInput col-8">
                          <label >Batch No</label>
                          <input type="text" name="batchno" value={userData.EmailID} onChange={handleChange} placeholder="batch no" />
                      </div>

                      <div className="formInput col-8">
                          <label>Total Purchased Qty</label>
                          <input type="number" name="totalpq" value={userData.Password} onChange={handleChange} placeholder="total purchased qty" />
                      </div>

                      <div className="formInput col-8">
                          <label >Total Recevied Qty </label>
                          <input type="number" name="totalrq" placeholder="total recevied qty" />
                      </div>
                      <div className="formInput col-8">
                          <label >Amount Paid</label>
                          <input type="text" name="EmailID" value={userData.EmailID} onChange={handleChange} placeholder="amount paid" />
                      </div>
                      <div className="formInput col-8">
                          <label >Damaged Qty </label>
                          <input type="number" name="damagedqty" placeholder="damaged qty" />
                      </div>
                      <div className="formInput col-8">
                          <label >Damaged Reason </label>
                          <input type="text" name="totalrq" placeholder="damaged reasion" />
                      </div>
                      <div className="formInput col-8">
                          <label >Lose of Amount </label>
                          <input type="number" name="loa" placeholder="loase of amount" />
                      </div>
                      <div className="formInput col-12 ">
                          <button onClick={handlAdduser} >Add Product</button>
                      </div>
                  </form>
              </div>
              <div className="col-md-4">
                <div className="pt-5">
                  <AddProduct />
                </div>
                <div className="pt-5">
                  <AddProductvendor />
                </div>
              </div>
            </div>
          </div>
  );
};

export default Rawmaterialform;
