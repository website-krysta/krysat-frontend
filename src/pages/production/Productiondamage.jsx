 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams ,useNavigate,useLocation} from 'react-router-dom';

const Productiondamage = () => {

const productionData = useLocation();
const { productionid } = useParams();
const navigate = useNavigate();

const [damagedInfo, setdamagedInfo] = useState({
    ProductionDamageID:0,
    DamagedQuantity: "",
    DamageReason: "",
    LossPrice: "",
    ID:'',
    AddedTimeStamp:'',
    UpdatedTimeStamp:'',
})


const handleDamagedChange = (event) => {
  setdamagedInfo({
    ...damagedInfo,
    [event.target.name]: event.target.value,
    
  });

};



const handlSalesDamage = async (event) => {
  event.preventDefault();
  let salsedamage_Data = {salseid:productionid,damaged:damagedInfo};
  try{
    debugger
    let res = await axios.post('api/production/damage/',salsedamage_Data);
    alert("Production damage recorded successfully!")
    navigate('/production/')
  }
  catch(error){
      alert("Oops! Unable to record production damage. Please check the provided details and try again later.")
  }

}

 
   
useEffect (()=>{
  handlSalesDamage();
}); 
  return (
      <div className="new">
          <Sidebar />
          <div className="newContainer">
              <Navbar />
              <div className="bottom" >
                  <div className="right" >

                      <div className="row">
                          <div className="datatable">
                              <div className="datatableTitle">
                                  Production Damage
                              </div>
                              <div>
                                  <div className="main">
                                      <form className="meaterialform">
                                          <div class="row damageform">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-12 addproduct_form  pb-5">

                                              <div className="mt-2 mb-3">
                                                  <label>Batch Number</label>
                                                      <input type="text" name="ID"  value={productionData?.state && productionData?.state.datainvoice.BatchNo} onChange={handleDamagedChange} className="form-control pt-2" id="code" disabled />
                                                  </div>
                                                  <div className="mt-2 mb-3">
                                                  <label>Damage Qty</label>
                                                      <input type="number" name="DamagedQuantity" v  onChange={handleDamagedChange} className="form-control pt-3" id="code" placeholder="Damage Qty" min="0" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Damage Reason</label>
                                                      <textarea cols={3} rows={6} type="text"   name="DamageReason" onChange={handleDamagedChange} className="form-control pt-3" id="name" placeholder="Damage Reason" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Loss of Amount</label>
                                                      <input type="number"   name="LossPrice" onChange={handleDamagedChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" min="0" required />
                                                  </div>


                                                  <div className="">
                                                      <button onClick={handlSalesDamage} >Add Damage</button>
                                                  </div>

                                              </div>
                                            
                                          </div>
                                      
                                      </form>
                                  </div>
                              </div>


                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
      );

};

export default Productiondamage;
