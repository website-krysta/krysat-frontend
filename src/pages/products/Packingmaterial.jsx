import "./productlist.scss";
import './addproduct.css' 
import AddPacking from "../products/packingpop/AddPacking"
// import Addvendor from "../products/packingpop/packinginfoAddvendor"
import Newvendor from "../products/Newvendor"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Packingmaterial = (props) => {
  const navigate = useNavigate();
//   const invoiceData = JSON.parse(sessionStorage.getItem('invoiceinfo'));
//   let invoicID = invoiceData['InvoiceID']
//   let vendorID = invoiceData['VendorID']
//   const navigate = useNavigate();

let invoicID  =  props.data.InvoiceID
let vendorID = props.data.VendorID
const [DamagedQty, setDifferenceQty] = useState("");
  
const [packinginfo, setpackinginfo] = useState({
      
  Id: 0,
  TransactionDate: "",
  BatchNo: "",
  OrderedQuantity:"",
  ReceivedQuantity: "",
  AmountPaid: "",
  AddedTimestamp: "",
  UpdatedTimestamp: "",
  PackingMaterialID: '',
  VendorID: '',
  InvoiceID:'',
  DamgeID:0,
  DamagedQty:'',
  DamagedResion:'',
  LossofAmount:''
});



const handleChange = (event) => {
  setpackinginfo({
  ...packinginfo,
  [event.target.name]: event.target.value,
  
});
// getselectvendordata(packinginfo.VendorID);
calculateDifference();
};

const handlAddmaterial = async (event) => {
event.preventDefault();
try{
  debugger
  packinginfo.InvoiceID = invoicID 
  packinginfo.VendorID = vendorID
  let res = await axios.post('/api/packing/packingdetails/add/', packinginfo );
  alert("Packing add sucessfully")
}
catch(error){
    alert('Packing adding fail please try agian!')
}

setpackinginfo({
      
  Id: "",
  TransactionDate: "",
  BatchNo: "",
  OrderedQuantity:"",
  ReceivedQuantity: "",
  AmountPaid: "",
  AddedTimestamp: "",
  UpdatedTimestamp: "",
  PackingMaterialID: '',
  VendorID: '',
  DamgeID:"",
  DamagedQty:'',
  DamagedResion:'',
  LossofAmount:''
});
}


// ------------ calculate difference-----------------
const calculateDifference = () => {
  const difference = parseFloat(packinginfo.OrderedQuantity) - parseFloat(packinginfo.ReceivedQuantity);
  setDifferenceQty(difference.toFixed(2));

};

// -----------------------------
const [options, setOptions] = useState([]);
const getpackingdata = async ()=>{
    try{
     let res = await axios.get('/api/packing/list/');
     setOptions(res.data)
     
    }
    catch(error){
     console.log(error)
    }
   }
// axios.get(`/api/packing/list/`)
// .then((res)=>{
//     setOptions(res.data)
   
// }).catch((error)=>{
//     console.log(error)
// })


// get vendor form data
// const [voptions, setvOptions] = useState([]);
// const getvendordata = async ()=>{
//  try{
  
//   let res = await axios.get('/api/vendor/list/');
//   setvOptions(res.data)
  
//  }
//  catch(error){
//   console.log(error)
//  }
// }

// const vid = packinginfo.VendorID
// const [vendorData, setvendorData] = useState([])

//     axios.get(`/api/vendor/${vid}/`)
//     .then((res)=>{
//         setvendorData(res.data)
//         console.log(vendorData)
//     }).catch((error)=>{
//         console.log(error)
//     })



useEffect (()=>{
handlAddmaterial();
getpackingdata();
},{})

  
return (
    <div className="new1">
       <form className="meaterialform">
        <div class="row">
            <h1 className="text-center text-primary pt-4"></h1>
            <div className="col-md-6 addproduct_form  pb-5">
                          <div className="row pt-2  mb-3 d-flex justify-content-center align-items-center ">
                              <div className="col-8 ">
                              <select  name='PackingMaterialID' value={packinginfo.PackingMaterialID} onChange={handleChange} class="custom-select form-control py-2 selectbox selectbox px-4" id="" >
                                    <option value="">-- select Packing material --  </option>
                                    {options.map((option) => (
                                        <option key={option.PackingMaterialID} value={option.PackingMaterialID}>{option.PackingMaterialName}</option>
                                    ))}
                                </select>
                              </div>
                              <div className="col-4 add">
                              <div class="input-group-append">
                                    <AddPacking />
                                </div>
                              </div>
                          </div>
                    <div className="col-12 mb-3">
                        <input type="text" name="BatchNo" value={packinginfo.BatchNo} onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                    </div>
                    <div className="col-12 mb-3">                         
                        <input type="number" name="OrderedQuantity" value={packinginfo.OrderedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                    </div>
                    <div className="col-12 mb-3">                      
                        <input type="text" name="ReceivedQuantity"  value={packinginfo.ReceivedQuantity} onChange={handleChange} className="form-control pt-3"  placeholder="Received quantity" />
                    </div>
                    <div className="col-12 mb-3">
                        <input type="number" name="AmountPaid" value={packinginfo.AmountPaid} onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                    </div>
                    
                    <div className="">
                        <button onClick={handlAddmaterial} >Add Packing</button>
                    </div>
              
            </div>

           
            <div className="col-md-6" id="vendorform" >
            
                    <div className="mt-2 mb-3">
                        <input type="number" value={DamagedQty} name="DamagedQty" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damaged Qty" required />
                    </div>
                    <div className="mb-3">
                        <textarea cols={3} rows={6} type="text" value={packinginfo.DamagedResion} name="DamagedResion" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damaged Reasion" required />
                    </div>
                    <div className="mb-3">
                        <input type="number" value={packinginfo.LossofAmount} name="LossofAmount" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="loss of Amount" required />
                    </div>
              
            </div>
        </div>
        </form>
    </div>

);
};
export default Packingmaterial;
