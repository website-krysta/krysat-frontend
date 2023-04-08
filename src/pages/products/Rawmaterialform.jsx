import "./productlist.scss";
import './addproduct.css' 
import Newrawmeterial from "../products/Newrawmeterial"
import Newvendor from "../products/Newvendor"
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate } from 'react-router-dom';


const Rawmaterialform = () => {
  const navigate = useNavigate();
  const [differenceQty, setDifferenceQty] = useState("");
  const [materialinfo, setmaterialinfo] = useState({
        
    Id: 3,
    TransactionDate: "2023-04-07T17:35:51Z",
    BatchNo: "",
    OrderedQuantity:"",
    ReceivedQuantity: "",
    AmountPaid: "",
    DamagedQty: null,
    DamagedResion: null,
    LossofAmount: null,
    AddedTimestamp: "2023-04-07T17:35:51Z",
    UpdatedTimestamp: "2023-04-07T17:35:51Z",
    MaterialID: '',
    VendorCode: ''
    
        
      
    
})
const handleChange = (event) => {
    setmaterialinfo({
    ...materialinfo,
    [event.target.name]: event.target.value
  });
  calculateDifference();
};

const handlAddmaterial = async (event) => {
  event.preventDefault();
  try{
    debugger
    let res = await axios.post('https://saimythribuilders.com/api/addRawmaterial/add/', materialinfo );
    navigate('/products/new')
    alert("Raw material add sucessfully")
  }
  catch(error){
      alert('Meterial adding fail please try agian !')
  }
}


// ------------ calculate difference-----------------
const calculateDifference = () => {
    const difference = parseFloat(materialinfo.OrderedQuantity) - parseFloat(materialinfo.ReceivedQuantity);
    setDifferenceQty(difference.toFixed(2));
  };

// -----------------------------
const [options, setOptions] = useState([]);
// const [selectedOption, setSelectedOption] = useState(null);
const getmeterialdata = async ()=>{
   try{
    
    let res = await axios.get('https://saimythribuilders.com/api/meterial/list/');
    setOptions(res.data)
    
   }
   catch(error){
    console.log(error)
   }
}

// get vendor form data
const [voptions, setvOptions] = useState([]);
// const [selectedvOption, setSelectedvOption] = useState(null);
const getvendordata = async ()=>{
   try{
    
    let res = await axios.get('https://saimythribuilders.com/api/vendor/list/');
    setvOptions(res.data)
    
   }
   catch(error){
    console.log(error)
   }
}

// const handlevendorChange = (event) => {
//     setSelectedvOption(event.target.value);
//   }


useEffect (()=>{
  handlAddmaterial();
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
                          <label >Raw Material</label>
                          <select id="role" name='MaterialID' value={materialinfo.MaterialID} onChange={handleChange} >
                                <option value="">-- select material --</option>
                                {options.map((option) => (
                                    <option key={option.MaterialCode}  value={option.MaterialID}>{option.MaterialID}</option>
                                ))}
                          </select>
                      </div>
                      <div className="formInput1 col-8">
                          <label >Vendor</label>
                          <select id="role" name="VendorCode" value={materialinfo.VendorCode} onChange={handleChange}>
                          <option value="">-- select vendor --</option>
                          {voptions.map((voption) => (
                              <option key={voption.VendorCode} value={voption.VendorCode}>{voption.VendorName}</option>
                          ))}
                          </select>
                      </div>
                      <div className="formInput col-8">
                          <label >Batch No</label>
                          <input type="text" name="BatchNo" value={materialinfo.BatchNo} onChange={handleChange} placeholder="batch no" />
                      </div>

                      <div className="formInput col-8">
                          <label>OrderedQuantity</label>
                          <input type="number" name="OrderedQuantity" value={materialinfo.OrderedQuantity} onChange={handleChange} placeholder="ordered quantity" />
                      </div>

                      <div className="formInput col-8">
                          <label >ReceivedQuantity </label>
                          <input type="text" name="ReceivedQuantity"  value={materialinfo.ReceivedQuantity} onChange={handleChange}  placeholder="received quantity" />
                      </div>
                      <div className="formInput col-8">
                          <label >Amount Paid</label>
                          <input type="number" name="AmountPaid" value={materialinfo.AmountPaid} onChange={handleChange} placeholder="amount paid" />
                      </div>
                      <div className="formInput col-8">
                          <label >Damaged Qty </label>
                          <input type="number" name="DamagedQty" value={differenceQty} onChange={handleChange} placeholder="damaged qty" />
                      </div>
                      <div className="formInput col-8">
                          <label >Damaged Reason </label>
                          <input type="text" name="DamagedResion" value={materialinfo.DamagedResion} onChange={handleChange}  placeholder="damaged reasion" />
                      </div>
                      <div className="formInput col-8">
                          <label >Lose of Amount </label>
                          <input type="number" name="LossofAmount" value={materialinfo.LossofAmount} onChange={handleChange} placeholder="loase of amount" />
                      </div>
                      <div className="formInput col-12 ">
                          <button onClick={handlAddmaterial} >Add Material</button>
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
