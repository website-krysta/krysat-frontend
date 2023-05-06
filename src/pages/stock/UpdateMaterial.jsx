 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';

const UpdateRawmaterial= () => {

const { addMaterialID } = useParams();

const invoiceData = JSON.parse(sessionStorage.getItem('invoiceinfo'));
let invoicID = invoiceData['InvoiceID']
let vendorID = invoiceData['VendorID']

// const [ getMdata , setMdata ] = useState([]); 

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
// const [ getMdata , setMdata ] = useState([]);
// const getmaterialData = async ()=>{
//   try{
//     debugger;
//     let res = await axios.get(`/api/rawmaterial_item/${addMaterialID}/`);
//     setMdata(res.data)
//     console.log(getMdata)
//   }
//   catch(error){
//     console.log(error)
//   }
// }
const [data, setData] = useState([]);
const [filterdata, setfilterdata] = useState([]);
  useEffect(() => {
    debugger;
    axios.get('/api/materialviewSet/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



    const filteredData = data.filter(obj => obj.Id === parseInt(addMaterialID));

   
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
                                      {filteredData.map((post)=>{
                                        return (
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-6 addproduct_form  pb-5">

                                                  <div className="col-12 mb-3 mt-2">
                                                  <label> Material Name</label>
                                                      <input type="text" name="MaterialName" value={filteredData[0].Material.MaterialName} onChange={handleChange} className="form-control pt-2" placeholder="Batch no"  disabled/>
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Batch No</label>
                                                      <input type="text" name="BatchNo" value={filteredData[0].BatchNo} onChange={handleChange} className="form-control pt-3" placeholder="Batch no" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Ordered Quantity</label>
                                                      <input type="number" name="OrderedQuantity" value={filteredData[0].OrderedQuantity}  onChange={handleChange} className="form-control pt-3" placeholder="Ordered quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label>Received Quantity</label>
                                                      <input type="text" name="ReceivedQuantity" value={filteredData[0].ReceivedQuantity} onChange={handleChange} className="form-control pt-3" placeholder="Received quantity" />
                                                  </div>
                                                  <div className="col-12 mb-3">
                                                  <label> Amount Paid</label>
                                                      <input type="number" name="AmountPaid" value={filteredData[0].AmountPaid}  onChange={handleChange} className="form-control pt-3" placeholder="Amount paid" />
                                                  </div>

                                                  <div className="">
                                                      <button onClick={handlAddmaterial} >Add Material</button>
                                                  </div>

                                              </div>
                                              <div className="col-md-6" id="vendorform" >

                                                  <div className="mt-2 mb-3">
                                                  <label> Inward Number</label>
                                                      <input type="text" name="inward number" value={filteredData[0].invoice.InwardNumber} onChange={handleChange} className="form-control pt-2" id="code" disabled />
                                                  </div>
                                                  <div className="mt-2 mb-3">
                                                  <label>Damaged Qty</label>
                                                      <input type="number" name="DamagedQty" value={filteredData[0].Damaged.DamagedQty}  onChange={handleChange} className="form-control pt-3" id="code" placeholder="Damaged Qty" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Damaged Resion</label>
                                                      <textarea cols={3} rows={6} type="text" value={filteredData[0].Damaged.DamagedResion}  name="DamagedResion" onChange={handleChange} className="form-control pt-3" id="name" placeholder="Damaged Reasion" required />
                                                  </div>
                                                  <div className="mb-3">
                                                  <label> Loss of Amount</label>
                                                      <input type="number" value={filteredData[0].Damaged.LossofAmount}  name="LossofAmount" onChange={handleChange} className="form-control pt-3" id="LooS of Amount" placeholder="Loss of Amount" required />
                                                  </div>

                                              </div>
                                          </div>
                                        )})}
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
