import "./productlist.scss";
import './addproduct.css' 
import Newrawmeterial from "../products/Newrawmeterial"
import Newvendor from "../products/Newvendor"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {useNavigate } from 'react-router-dom';


const Rawmaterialform = () => {
//   const navigate = useNavigate();
const invoiceData = JSON.parse(sessionStorage.getItem('invoiceinfo'));
let invoicID = invoiceData['InvoiceID']
let vendorID = invoiceData['VendorID']
  const [DamagedQty, setDifferenceQty] = useState("");
  
  const [materialinfo, setmaterialinfo] = useState({
        
    Id: 0,
    TransactionDate: "",
    BatchNo: "",
    OrderedQuantity:"",
    ReceivedQuantity: "",
    AmountPaid: "",
    AddedTimestamp: "",
    UpdatedTimestamp: "",
    MaterialID: '',
    InvoiceID:'',
    VendorID:'',
    DamgeID:0,
    DamagedQty:'',
    DamagedResion:'',
    LossofAmount:''
});



const handleChange = (event) => {
    setmaterialinfo({
    ...materialinfo,
  
    [event.target.name]: event.target.value,
    
  });
//   getselectvendordata(materialinfo.VendorID);
  calculateDifference();
};

const handlAddmaterial = async (event) => {
  event.preventDefault();
  try{
    debugger
    materialinfo.InvoiceID = invoicID 
    materialinfo.VendorID = vendorID
    let res = await axios.post('/api/addRawmaterial/add/', materialinfo );
    alert("Raw material add sucessfully")
  }
  catch(error){
      alert('Meterial adding fail please try agian!')
  }

  setmaterialinfo({
        
    Id: "",
    TransactionDate: "",
    BatchNo: "",
    OrderedQuantity:"",
    ReceivedQuantity: "",
    AmountPaid: "",
    AddedTimestamp: "",
    UpdatedTimestamp: "",
    MaterialID: '',
    VendorID: '',
    DamgeID:"",
    DamagedQty:'',
    DamagedResion:'',
    LossofAmount:''
});
}


// ------------ calculate difference-----------------
const calculateDifference = () => {
    const difference = parseFloat(materialinfo.OrderedQuantity) - parseFloat(materialinfo.ReceivedQuantity);
    setDifferenceQty(difference.toFixed(2));

  };

// -----------------------------
const [options, setOptions] = useState([]);
const getmaterialData = async ()=>{
  try{
    let res = await axios.get('api/meterial/list/');
    setOptions(res.data)
  }
  catch(error){
    console.log(error)
  }
}

// const getmeterialdata = async ()=>{
//    try{
//     let res = await axios.get('/api/meterial/list/');
//     setOptions(res.data)
    
//    }
//    catch(error){
//     console.log(error)
//    }
// }

// get vendor form data
// const [voptions, setvOptions] = useState([]);
// const getvendordata =()=>{
//    try{

//     let res = axios.get('/api/vendor/list/');
//     setvOptions(res.data)
    
//    }
//    catch(error){
//     console.log(error)
//    }
// }

// const vid = materialinfo.VendorID
// const [vendorData, setvendorData] = useState({})

//     axios.get(`/api/vendor/${vid}/`)
//     .then((res)=>{
//         setvendorData(res.data)
//         console.log(vendorData)
//     }).catch((error)=>{
//         console.log(error)
//     })
    




useEffect (()=>{
  handlAddmaterial();
  getmaterialData();
  // getvendordata();
//   getselectvendordata();
//   getmeterialdata();
  // getvendordata();
},[])

// getselectvendordata, handlAddmaterial
    
  return (
      <div className="new1">
         <form className="meaterialform">
          <div class="row">
              <h1 className="text-center text-primary pt-4"></h1>
              <div className="col-md-6 addproduct_form  pb-5">
                            <div className="row pt-2  mb-3 d-flex justify-content-center align-items-center ">
                                <div className="col-8 ">
                                <select  name='MaterialID' value={materialinfo.MaterialID} onChange={handleChange} class="custom-select form-control py-2 selectbox selectbox px-4" id="" >
                                      <option value="">-- select material --  </option>
                                      {options.map((option) => (
                                          <option key={option.MaterialID} value={option.MaterialID}>{option.MaterialName}</option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-4 add">
                                <div class="input-group-append">
                                      <Newrawmeterial />
                                  </div>
                                </div>
                            </div>
                      <div className="col-12 mb-3">
                          <input type="text" name="BatchNo" value={materialinfo.BatchNo} onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                      </div>
                      <div className="col-12 mb-3">                         
                          <input type="number" name="OrderedQuantity" value={materialinfo.OrderedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                      </div>
                      <div className="col-12 mb-3">                      
                          <input type="text" name="ReceivedQuantity"  value={materialinfo.ReceivedQuantity} onChange={handleChange} className="form-control pt-3"  placeholder="Received quantity" />
                      </div>
                      <div className="col-12 mb-3">
                          <input type="number" name="AmountPaid" value={materialinfo.AmountPaid} onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                      </div>
                      
                      <div className="">
                          <button onClick={handlAddmaterial} >Add Material</button>
                      </div>
                
              </div>
              <div className="col-md-6" id="vendorform" >
              
                      <div className="mt-2 mb-3">
                          <input type="number" value={DamagedQty} name="DamagedQty" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damaged Qty" required />
                      </div>
                      <div className="mb-3">
                          <textarea  cols={3} rows={6} type="text" value={materialinfo.DamagedResion} name="DamagedResion" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damaged Reasion" required />
                      </div>
                      <div className="mb-3">
                          <input type="number" value={materialinfo.LossofAmount} name="LossofAmount" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" required />
                      </div>
                
              </div>
          </div>
          </form>
      </div>

  );
};

export default Rawmaterialform;
