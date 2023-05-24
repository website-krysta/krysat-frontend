import "./productlist.scss";
import './addproduct.css' 
import AddProduct from "../products/productpop/AddProduct"
// import AddProductvendor from "../products/productpop/Addvendor"
import Newvendor from "../products/Newvendor"
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Productform = (props) => {

  const navigate = useNavigate();
//   const invoiceData = JSON.parse(sessionStorage.getItem('invoiceinfo'));
//   let invoicID = invoiceData['InvoiceID']
//   let vendorID = invoiceData['VendorID']
//   const navigate = useNavigate();
let invoicID  =  props.data.InvoiceID
let vendorID = props.data.VendorID
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
  InvoiceID:'',
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
// getselectvendordata(productinfo.VendorID);
// calculateDifference();
};

const handlAddmaterial = async (event) => {
event.preventDefault();
try{
    productinfo.InvoiceID = invoicID 
    productinfo.VendorID = vendorID
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
useEffect(() => {
// const calculateDifference = () => {
  const difference = parseFloat(productinfo.OrderedQuantity) - parseFloat(productinfo.ReceivedQuantity);
  setDifferenceQty(difference.toFixed(2));

});

// -----------------------------
const [options, setOptions] = useState([]);
useEffect(() => {
  axios.get('api/product/list/')
    .then((res)=>{
      setOptions(res.data)
    }).catch((error)=>{
        console.log(error)
    })
});
// const getproductdata = async ()=>{
//     try{
//      let res = await axios.get('/api/product/list/');
//      setOptions(res.data)
     
//     }
//     catch(error){
//      console.log(error)
//     }
//    }

   const product_id = productinfo.ProductID
   const [qty, setqty] = useState({});
   useEffect(() => {
     debugger;
       axios.get(`api/product/${product_id}/`)
       .then((res)=>{
         setqty(res.data[0])
       }).catch((error)=>{
           console.log(error)
       })
     }, [product_id]);


// axios.get(`/api/product/list/`)
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

// const vid = productinfo.VendorID
// const [vendorData, setvendorData] = useState([])
// const getselectvendordata = async (VendorID)=>{
//  try{
//   let res = await axios.get(`/api/vendor/${VendorID}/`);
//   setvendorData(res.data)
//   console.log(vendorData)
//  }
//  catch(error){
//   console.log(error)
//  }
// }


// const vid = productinfo.VendorID
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
// getproductdata();

},{})

  
return (
    <div className="new1">
       <form className="meaterialform">
        <div class="row">
            <h1 className="text-center text-primary pt-4"></h1>
            <div className="col-md-6 addproduct_form  pb-5">
                          <div className="row pt-2  mb-3 d-flex justify-content-center align-items-center ">
                              <div className="col-8 ">
                              <select  name='ProductID' value={productinfo.ProductID} onChange={handleChange} class="custom-select form-control py-2 selectbox selectbox px-4" id="" >
                                    <option value="">-- select white labeling--  </option>
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
                    <div className="col-12 mb-3">
                        <input type="text" name="BatchNo" value={productinfo.BatchNo} onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                    </div>
                    <div className="col-12 mb-3 input-group">                         
                        <input type="number" name="OrderedQuantity" value={productinfo.OrderedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                        <span class="input-group-text" id="basic-addon2">{qty.QtyType}</span>
                    </div>
                    <div className="col-12 mb-3 input-group">                      
                        <input type="text" name="ReceivedQuantity"  value={productinfo.ReceivedQuantity} onChange={handleChange} className="form-control pt-3"  placeholder="Received quantity" />
                        <span class="input-group-text" id="basic-addon2">{qty.QtyType}</span>
                    </div>
                    <div className="col-12 mb-3 input-group">
                        <input type="number" name="AmountPaid" value={productinfo.AmountPaid} onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                        <span class="input-group-text" id="basic-addon2">₹</span>
                    </div>
                    
                    <div className="">
                        <button onClick={handlAddmaterial} >Add Product</button>
                    </div>
              
            </div>

            <div className="col-md-6" id="vendorform" >
            
                    <div className="mt-2 mb-3 input-group">
                        <input type="number" value={DamagedQty} name="DamagedQty" onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damag Qty" required />
                    </div>
                    <div className="mb-3 input-group">
                        <textarea cols={3} rows={6} type="text" value={productinfo.DamagedResion} name="DamagedResion" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damag Reason" required />
                    </div>
                    <div className="mb-3 input-group">
                        <input type="number" value={productinfo.LossofAmount} name="LossofAmount" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" required />
                        <span class="input-group-text" id="basic-addon2">₹</span>
                    </div>
              
            </div>
        </div>
        </form>
    </div>

);
};

export default Productform;
