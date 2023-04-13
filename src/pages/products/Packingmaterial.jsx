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
  handlAdduser();
},{})





  return (
    <div className="new">
            <div class="row">
              <h1 className="text-center text-primary pt-4">Add Packing Material </h1>
              <div className="col-md-4 addproduct_form  pb-5">

<form className="meaterialform">
          <div className="row pt-2 px-3  d-flex justify-content-center align-items-center ">
              <div className="col-8">
              <select  name='MaterialID' value="" onChange={handleChange} class="custom-select form-control py-2 selectbox " id="" >
                    <option value="">-- select material --  </option>
                    {options.map((option) => (
                        <option key={option.MaterialCode} value={option.MaterialID}>{option.MaterialName}</option>
                    ))}
                </select>
              </div>
              <div className="col-4 add">
              <div class="input-group-append">
                    <AddPacking />
                </div>
              </div>
          </div>
          <div className="row pt-2 px-3  d-flex justify-content-center align-items-center">
                  <div className="col-8">
                  <select  name="VendorCode" value="" onChange={handleChange} class="custom-select form-control py-2 selectbox " id="inputGroupSelect04">
                  <option value="">-- select vendor --</option>
                  {voptions.map((voption) => (
                      <option key={voption.VendorCode} value={voption.VendorCode}>{voption.VendorName}</option>
                  ))}
              </select>
                  </div>
                  <div className="col-4 add">
                  <div class="input-group-append">
                  <Addvendor/>
                  </div>
                  </div>
          </div>
    <div className="col-11">
        <input type="text" name="BatchNo" value="" onChange={handleChange} className="form-control pt-3" placeholder="batch no" />
    </div>
    <div className="col-11">                         
        <input type="number" name="OrderedQuantity" value="" onChange={handleChange} className="form-control pt-3" placeholder="ordered quantity" />
    </div>
    <div className="col-11">                      
        <input type="text" name="ReceivedQuantity"  value="" onChange={handleChange} className="form-control pt-3"  placeholder="received quantity" />
    </div>
    <div className="col-11">
        <input type="number" name="AmountPaid" value="" onChange={handleChange} className="form-control pt-3" placeholder="amount paid" />
    </div>
    
    <div className="">
        <button onClick="" >Add Package</button>
    </div>
</form>
</div>

<div className="col-md-4">
<form id="vendorform" >
    <div className="formInput1 mb-3 mt-2">
        <input type="text" name="VendorCode" onChange={handleChange} className="form-control pt-3" id="code" placeholder="vendor code" required />
    </div>
    <div className="formInput1">
        <input type="text" name="VendorName" onChange={handleChange} className="form-control pt-3" id="name" placeholder="name" required />
    </div>
    <div className="">
        <input type="email" name="EmailID" onChange={handleChange} className="form-control pt-3" id="email1" placeholder="email" required />
    </div>
    <div className="">
        <input type="phone" name="Phone" onChange={handleChange} className="form-control pt-3" id="exampleInputphone" placeholder="phone" required />
    </div>
    <div className="">
        <input type="text" name="VendorShopName" onChange={handleChange} className="form-control pt-3" id="ShopName" placeholder="ShopName" required />
    </div>
    <div className="">
        <input type="text" name="Address" onChange={handleChange} className="form-control pt-3" id="exampleInputaddress" placeholder="address" required />
    </div>
    <div className="">
        <input type="text" name="City" onChange={handleChange} className="form-control pt-3" id="city" placeholder="city" required />
    </div>
    <div className="">
        <input type="text" name="State" onChange={handleChange} className="form-control pt-3" id="examplestate" placeholder="state" required />
    </div>
</form>

</div>
<div className="col-md-4">
<form id="vendorform" >
    <div className="mt-2">
        <input type="number" name="VendorCode" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damaged Qty" required />
    </div>
    <div className="">
        <input type="text" name="VendorName" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damaged Reasion" required />
    </div>
    <div className="">
        <input type="number" name="EmailID" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="loss of Amount" required />
    </div>
   
</form>
</div>
</div>
</div>

     
  );
};

export default Rawmaterialform;
