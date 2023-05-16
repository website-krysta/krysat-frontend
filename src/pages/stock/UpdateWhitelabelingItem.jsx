 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateWhitelabelingItem= () => {

const { productID } = useParams();
const navigate = useNavigate();

const [DamagedQty, setDifferenceQty] = useState({});
const [productItem, setproductItem] = useState({
    Id: '',
    TransactionDate: "",
    BatchNo: "",
    OrderedQuantity: "",
    ReceivedQuantity: "",
    AmountPaid: "",
    AddedTimestamp: "",
    UpdatedTimestamp: "",
    ProductID: "",
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
const [rawProductInfo, setrawProductInfo] = useState({
  PackingMaterialID: "",
  PackingMaterialCode: "",
  PackingMaterialName: "",
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
  setproductItem({
    ...productItem,
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
  setrawProductInfo({
    ...rawProductInfo,
    [event.target.name]: event.target.value,
    
  });

};




useEffect(() => {
  async function fetchData() {  
    debugger
    const productItem  = await axios.get(`api/productDetails/${productID}/`);
    const damageddata  = await axios.get(`api/damaged/${productItem.data[0].DamgeID}/`);
    const rawMaterialdata  = await axios.get(`api/product/${productItem.data[0].ProductID}/`);
    const invoiceData  = await axios.get(`api/invoce/getinvoice/${productItem.data[0].InvoiceID}/`);

    setproductItem(productItem.data[0]);
    setdamagedInfo(damageddata.data[0]);
    setrawProductInfo(rawMaterialdata.data[0]);
    setinvoiceInfo(invoiceData.data);
  }

    fetchData();
  }, [productID]);




const handlAddmaterial = async (event) => {
  event.preventDefault();
  let whitelabeling_Data = {
    productItem:productItem,
    damaged:damagedInfo,
    product:rawProductInfo,
    invoice:invoiceInfo,
  };

  try{
    debugger
    let res = await axios.post('api/update_whitelabeling/update/',whitelabeling_Data);
    alert("White Labeling Update sucessfully")
    navigate('/stock/')
  }
  catch(error){
      alert('White Labeling Update fail please try agian!')
  }

}


// ------------ calculate difference-----------------
const calculateDifference = () => {
    const difference = (productItem.OrderedQuantity) - (productItem.ReceivedQuantity);
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
                                Update Packing Item
                              </div>
                              <div>
                                  <div className="main">
                                      <form className="meaterialform">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-6 addproduct_form  pb-5">

                                                  <div className="col-12 mb-3 mt-2">
                                                  <label> Material Name</label>
                                                      <input type="text" name="MaterialName"  value={rawProductInfo.ProductName} onChange={handlerawmaterialChange} className="form-control pt-2" placeholder="Material Name"  disabled/>
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Batch No</label>
                                                      <input type="number" name="BatchNo" value={productItem.BatchNo}   onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Ordered Quantity</label>
                                                      <input type="number" name="OrderedQuantity" value={productItem.OrderedQuantity}  onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Received Quantity</label>
                                                      <input type="number" name="ReceivedQuantity" value={productItem.ReceivedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Received quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label> Amount Paid</label>
                                                      <input type="number" name="AmountPaid" value={productItem.AmountPaid}  onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                                                  </div>

                                                  <div className="">
                                                      <button onClick={handlAddmaterial} >Update Packing</button>
                                                  </div>

                                              </div>
                                              <div className="col-md-6" id="vendorform" >

                                                  <div className="mt-2 mb-3">
                                                  <label> Inward Number</label>
                                                      <input type="text" name="inwardnumber" value={invoiceInfo.InwardNumber} onChange={handleChange} className="form-control pt-2" id="code" disabled />
                                                  </div>
                                                  <div className="mt-2 mb-3">
                                                  <label>Damage Qty</label>
                                                      <input type="number" name="DamagedQty" value={productItem.OrderedQuantity-productItem.ReceivedQuantity}  onChange={handleDamagedChange} className="form-control pt-3" id="code" placeholder="Damage Qty" required />
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

export default UpdateWhitelabelingItem;
