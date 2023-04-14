import "./productlist.scss";
import './addproduct.css' 
import AddProduct from "../products/productpop/AddProduct"
// import AddProductvendor from "../products/productpop/Addvendor"
import Newvendor from "../products/Newvendor"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Productform = () => {
  const navigate = useNavigate();
 
//   const navigate = useNavigate();
const [DamagedQty, setDifferenceQty] = useState("");
  
const [productinfo, setproductinfo] = useState({
      
  Id: 0,
  TransactionDate: "",
  BatchNo: "",
  OrderedQuantity:"",
  ReceivedQuantity: "",
  AmountPaid: "",
  AddedTimestamp: "",
  UpdatedTimestamp: "",
  ProductID: '',
  VendorID: '',
  DamgeID:0,
  DamagedQty:'',
  DamagedResion:'',
  LossofAmount:''
});



const handleChange = (event) => {
  setproductinfo({
  ...productinfo,
  [event.target.name]: event.target.value,
  
});
getselectvendordata(productinfo.VendorID);
calculateDifference();
};

const handlAddmaterial = async (event) => {
event.preventDefault();
try{
  debugger
  let res = await axios.post('/api/product/ProductDetails/add/', productinfo );
  alert("Product add sucessfully")
}
catch(error){
    alert('Product adding fail please try agian!')
}

setproductinfo({
      
  Id: "",
  TransactionDate: "",
  BatchNo: "",
  OrderedQuantity:"",
  ReceivedQuantity: "",
  AmountPaid: "",
  AddedTimestamp: "",
  UpdatedTimestamp: "",
  ProductID: '',
  VendorID: '',
  DamgeID:"",
  DamagedQty:'',
  DamagedResion:'',
  LossofAmount:''
});
}


// ------------ calculate difference-----------------
const calculateDifference = () => {
  const difference = parseFloat(productinfo.OrderedQuantity) - parseFloat(productinfo.ReceivedQuantity);
  setDifferenceQty(difference.toFixed(2));

};

// -----------------------------
const [options, setOptions] = useState([]);
const getproductdata = async ()=>{
 try{
  let res = await axios.get('/api/product/list/');
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
  
  let res = await axios.get('/api/vendor/list/');
  setvOptions(res.data)
  
 }
 catch(error){
  console.log(error)
 }
}


const [vendorData, setvendorData] = useState([])
const getselectvendordata = async (VendorID)=>{
 try{
  let res = await axios.get(`/api/vendor/${VendorID}/`);
  setvendorData(res.data)
  console.log(vendorData)
 }
 catch(error){
  console.log(error)
 }
}



useEffect (()=>{
handlAddmaterial();
getproductdata();
getvendordata();
},{})

  
return (
    <div className="new1">
       <form className="meaterialform">
        <div class="row">
            <h1 className="text-center text-primary pt-4"></h1>
            <div className="col-md-4 addproduct_form  pb-5">
                          <div className="row pt-2  mb-3 d-flex justify-content-center align-items-center ">
                              <div className="col-8 ">
                              <select  name='ProductID' value={productinfo.ProductID} onChange={handleChange} class="custom-select form-control py-2 selectbox selectbox px-4" id="" >
                                    <option value="">-- select Product--  </option>
                                    {options.map((option) => (
                                        <option key={option.ProductID} value={option.ProductID}>{option.ProductName}</option>
                                    ))}
                                </select>
                              </div>
                              <div className="col-4 add">
                              <div class="input-group-append">
                                    <AddProduct />
                                </div>
                              </div>
                          </div>
                    <div className="col-11 mb-3">
                        <input type="text" name="BatchNo" value={productinfo.BatchNo} onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                    </div>
                    <div className="col-11 mb-3">                         
                        <input type="number" name="OrderedQuantity" value={productinfo.OrderedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                    </div>
                    <div className="col-11 mb-3">                      
                        <input type="text" name="ReceivedQuantity"  value={productinfo.ReceivedQuantity} onChange={handleChange} className="form-control pt-3"  placeholder="Received quantity" />
                    </div>
                    <div className="col-11 mb-3">
                        <input type="number" name="AmountPaid" value={productinfo.AmountPaid} onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                    </div>
                    
                    <div className="">
                        <button onClick={handlAddmaterial} >Add Product</button>
                    </div>
              
            </div>

            <div className="col-md-4 ">
                <div className="row pt-2  mb-3 d-flex justify-content-center align-items-center">
                                  <div className="col-8">
                                  <select  name="VendorID" value={productinfo.VendorID} onChange={handleChange} class="custom-select form-control py-2 selectbox px-4 " id="inputGroupSelect04">
                                  <option >--- select vendor ---</option>
                                  {voptions.map((voption) => (
                                      <option key={voption.VendorID} value={voption.VendorID}>{voption.VendorName}</option>
                                  ))}
                              </select>
                                  </div>
                                  <div className="col-4 add ">
                                  <div class="input-group-append">
                                  <Newvendor/>
                                  </div>
                                  </div>
                          </div>
                    <div className="formInput1 mb-3 mt-2">
                        <input type="text" value={vendorData.VendorCode} name="" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Vendor code" required />
                    </div>
                    <div className="formInput1 mb-3">
                        <input type="text" value={vendorData.VendorName}  name="VendorName" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Name" required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={vendorData.EmailID} name="EmailID" onChange={handleChange} className="form-control pt-3" id="email1" placeholder="Email" required />
                    </div>
                    <div className="mb-3">
                        <input type="phone" value={vendorData.Phone} name="Phone" onChange={handleChange} className="form-control pt-3" id="exampleInputphone" placeholder="Phone" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={vendorData.RegisteredName} name="RegisteredName" onChange={handleChange} className="form-control pt-3" id="RegisteredName" placeholder="RegisteredName" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={vendorData.Address} name="Address" onChange={handleChange} className="form-control pt-3" id="exampleInputaddress" placeholder="Address" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={vendorData.City} name="City" onChange={handleChange} className="form-control pt-3" id="city" placeholder="City" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={vendorData.State}  name="State" onChange={handleChange} className="form-control pt-3" id="examplestate" placeholder="State" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={vendorData.Zip}  name="Zip" onChange={handleChange} className="form-control pt-3" id="Zip" placeholder="Zip Code" required />
                    </div>

            </div>
            <div className="col-md-4" id="vendorform" >
            
                    <div className="mt-2 mb-3">
                        <input type="number" value={DamagedQty} name="DamagedQty" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damaged Qty" required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={productinfo.DamagedResion} name="DamagedResion" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damaged Reasion" required />
                    </div>
                    <div className="mb-3">
                        <input type="number" value={productinfo.LossofAmount} name="LossofAmount" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" required />
                    </div>
              
            </div>
        </div>
        </form>
    </div>

);
};

export default Productform;
