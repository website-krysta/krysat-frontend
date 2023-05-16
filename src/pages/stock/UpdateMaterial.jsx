 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateRawmaterial= () => {

const { addMaterialID } = useParams();
const navigate = useNavigate();

const [DamagedQty, setDifferenceQty] = useState({DamagedQty:12});
const [materialDetails, setmaterialDetails] = useState({
    Id: '',
    TransactionDate: "",
    BatchNo: "",
    OrderedQuantity: "",
    ReceivedQuantity: "",
    AmountPaid: "",
    AddedTimestamp: "",
    UpdatedTimestamp: "",
    MaterialID: "",
    VendorID: "",
    DamgeID: "",
    DamagedQty:'',
    InvoiceID: ""
})
const [damagedInfo, setdamagedInfo] = useState({
  DamagedQty: "",
  DamagedResion: "",
  LossofAmount: ""
})
const [rawmaterialInfo, setrawmaterialInfo] = useState({
  MaterialID: "",
  MaterialCode: "",
  MaterialName: "",
  QtyType: "",
  TotalQuantity: "",
  ConsumedQuantity: "",
  AddedTimestamp: "",
  UpdatedTimestamp: ""
})

const [invoiceInfo, setinvoiceInfo] = useState({
  InvoiceID: "",
  InvoiceNumber: "",
  InwardNumber: "",
  InvoiceDate: "",
  RecievedDate: "",
  VendorID: 8,
  AddedTimeStamp: "",
  UpdatedTimeStamp: ""
})

const handleChange = (event) => {
  setmaterialDetails({
    ...materialDetails,
    [event.target.name]: event.target.value,
    
  });
  // calculateDifference();
};
const handleDamagedChange = (event) => {
  setdamagedInfo({
    ...damagedInfo,
    [event.target.name]: event.target.value,
    
  });
  // calculateDifference();
};
const handleDamagedQtyChange = (event) => {
  const newDamagedQty = event.target.value;
  setdamagedInfo((prevState) => ({
    ...prevState,
    DamagedQty: newDamagedQty
  }));
};
const handlerawmaterialChange = (event) => {
  setrawmaterialInfo({
    ...rawmaterialInfo,
    [event.target.name]: event.target.value,
    
  });

};




useEffect(() => {
  async function fetchData() {  
    debugger
    const materialdetails  = await axios.get(`api/addRawmaterial/${addMaterialID}/`);
    const damageddata  = await axios.get(`api/damaged/${materialdetails.data.DamgeID}/`);
    const rawMaterialdata  = await axios.get(`api/meterial/${materialdetails.data.MaterialID}/`);
    const invoiceData  = await axios.get(`api/invoce/getinvoice/${materialdetails.data.InvoiceID}/`);

    setmaterialDetails(materialdetails.data);
    setdamagedInfo(damageddata.data[0]);
    setrawmaterialInfo(rawMaterialdata.data[0]);
    setinvoiceInfo(invoiceData.data);
  }

    fetchData();
  }, [addMaterialID]);




const handlAddmaterial = async (event) => {
  event.preventDefault();
  let rawMaterial_Data = {
    materialDetails:materialDetails,
    damaged:damagedInfo,
    rawmaterial:rawmaterialInfo,
    invoice:invoiceInfo,
  };

  try{
    debugger
    let res = await axios.post('api/updateRawmaterial/update/',rawMaterial_Data);
    alert("Raw material Update sucessfully")
    navigate('/stock/')
  }
  catch(error){
      alert('Meterial Update fail please try agian!')
  }

}


// ------------ calculate difference-----------------
const calculateDifference = () => {
    const difference = (materialDetails.OrderedQuantity) - (materialDetails.ReceivedQuantity);
    setDifferenceQty(difference.toFixed(2));
    debugger;

  };


  
  
   
useEffect (()=>{
  handlAddmaterial();
});

// getselectvendordata, handlAddmaterial
    
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
                                  Raw Material updaate
                              </div>
                              <div>
                                  <div className="main">
                                      <form className="meaterialform">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-6 addproduct_form  pb-5">

                                                  <div className="col-12 mb-3 mt-2">
                                                  <label> Material Name</label>
                                                      <input type="text" name="MaterialName"  value={rawmaterialInfo.MaterialName} onChange={handlerawmaterialChange} className="form-control pt-2" placeholder="Material Name"  disabled/>
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Batch No</label>
                                                      <input type="number" name="BatchNo" value={materialDetails.BatchNo}   onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Ordered Quantity</label>
                                                      <input type="number" name="OrderedQuantity" value={materialDetails.OrderedQuantity}  onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Received Quantity</label>
                                                      <input type="number" name="ReceivedQuantity" value={materialDetails.ReceivedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Received quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label> Amount Paid</label>
                                                      <input type="number" name="AmountPaid" value={materialDetails.AmountPaid}  onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                                                  </div>

                                                  <div className="">
                                                      <button onClick={handlAddmaterial} >Update Material</button>
                                                  </div>

                                              </div>
                                              <div className="col-md-6" id="vendorform" >

                                                  <div className="mt-2 mb-3">
                                                  <label> Inward Number</label>
                                                      <input type="text" name="inwardnumber" value={invoiceInfo.InwardNumber} onChange={handleChange} className="form-control pt-2" id="code" disabled />
                                                  </div>
                                                  <div className="mt-2 mb-3">
                                                  <label>Damage Qty</label>
                                                      <input type="number" name="DamagedQty" value={materialDetails.OrderedQuantity-materialDetails.ReceivedQuantity}  onChange={handleDamagedChange} className="form-control pt-3" id="code" placeholder="Damage Qty" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Damage Reason</label>
                                                      <textarea cols={3} rows={6} type="text" value={damagedInfo.DamagedResion}  name="DamagedResion" onChange={handleDamagedChange} className="form-control pt-3" id="name" placeholder="Damage Reason" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Loss of Amount</label>
                                                      <input type="number" value={damagedInfo.LossofAmount}  name="LossofAmount" onChange={handleDamagedChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" required />
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

export default UpdateRawmaterial;
