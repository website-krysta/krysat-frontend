// import "../products/productlist.scss";
// import '../products/addproduct.css' 
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Addlabour = () => {

 const navigate = useNavigate();

  //  start main function
  const [labourData, setlabourData] = useState({
    ID :'',
    TotalLabours :'',
    MorningShiftCount  :'',
    NightShiftCount :'',
    MorningShiftAmount :'',
    NightShiftAmount :'',
    EnteryDate:'',
    AddedTimeStamp :'2023-04-05T13:05:52Z',
    updatedTimeStamp :'2023-04-05T13:05:52Z',
  });
  
  const handleChange = (event) => {
    setlabourData({
      ...labourData,
      [event.target.name]: event.target.value
    });
  };
  
  const [checkedItems, setCheckedItems] = useState([]);  
  const [aMaterial, setaMaterial] = useState([]); 
   //  start main function
   const handleItemCheck = (itemId,itemName) => {
     debugger;
     const listItems = [];
     for (let i = 0; i < aMaterial.length; i++) {
         const item_id = aMaterial[i].materialid;
         listItems.push(item_id)
     }
     const isChecked = listItems.includes(itemId);
     if (isChecked) {
         setaMaterial(aMaterial => aMaterial.filter(item => item.materialid !== itemId))
         setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemId),itemName)
     
     } else {
         
         const materialObject = {
             materialid:itemId,
             materialname:itemName
           };
           // Set the object as state
           setaMaterial([...aMaterial, materialObject]);
         //   setoMaterial(materialObject);
         setCheckedItems(prevCheckedItems => [...prevCheckedItems, itemId,itemName]);
     }
   };
 



  let [formulaData , setFormulaData] = useState([]);
  const getmaterialData = async ()=>{
     try{
      
      let res = await axios.get('api/formula/list/');
      setFormulaData(res.data)
      console.log(formulaData )
     }
     catch(error){
      console.log(error)
     }
  }
  
  const handlAddlabour = async (event) => {
    event.preventDefault();

    try{
        debugger;
        const labour_info = {
            formula:aMaterial,
            labour_data:labourData
          };
      let res = await axios.post('api/labour/add/',labour_info  );
      navigate('/labour')
      alert("Labour information created successfully!")
    }
    catch(error){
        alert("Oops! Unable to create Labour information. Please check the provided details and try again later.")
    }
  }
  
  
  useEffect (()=>{
    handlAddlabour();
    getmaterialData();
  },{})

  return (
      <div className="new">
          <Sidebar />
          <div className="newContainer">
              <Navbar />
              <div className="bottom" >
                  <div className="right" >
                      <div className="row laboursection">
                          <div className="datatable">
                              <div className="datatableTitle formtitle">
                                  Add Labour Details
                              </div>
                              <div>
                                <form className="labourform form page__form">
                                      <div class="row">
                                          <h1 className="text-center text-primary pt-4"></h1>
                                          <div className="col-md-12">


                                              <div className="show-material">
                                                  <div className="row">

                                                      {formulaData.map((post) => {
                                                          return (
                                                              <div className="col-3  px-5 formula-tails">
                                                                  <div className="material-item">
                                                                      <div className="d-flex">
                                                                          <input type="checkbox"
                                                                              className="px-5"
                                                                                checked={checkedItems.includes(post.FormulaID)}
                                                                                onChange={() => handleItemCheck(post.FormulaID,post.FormulaName)}    
                                                                              id="{post.FormulaID}"
                                                                              name="{post.FormulaID}"
                                                                              value="{post.FormulaName}" />&nbsp;
                                                                          <label for="vehicle1">{post.FormulaName}</label><br></br>
                                                                      </div>
                                                                  </div>
                                                              </div>);
                                                      })}

                                                  </div>
                                              </div>
                                              <div className="d-flex justify-content-center lb-form">
                                                  <div>
                                                      <div className="col-md-12 mb-5 box">
                                                          <div className="mb-3 input-wrapper pb-2">
                                                              <input type="date" name="EnteryDate" onChange={handleChange} className="form-control  form__input" id="enteryDate" placeholder="enteryDate"  required />
                                                              <label for="input" className="control-label">Entry Date</label>
                                                          </div>
                                                          <div className="mb-3 mt-2 input-wrapper pb-2">
                                                              <input type="number" name="TotalLabours" onChange={handleChange} className="form-control  form__input" id="TotalLabours" placeholder="TotalLabours"  min="0" required />
                                                              <label for="input" className="control-label">Total Labours</label>
                                                          </div>
                                                          <div className="mb-3 input-wrapper pb-2">
                                                              <input type="number" name="MorningShiftCount" onChange={handleChange} className="form-control" id="MorningShiftCount" placeholder="MorningShiftCount" min="0" required />
                                                              <label for="input" className="control-label">Morning Shift</label>
                                                          </div>
                                                          <div className="mb-3 input-wrapper pb-2">
                                                              <input type="number" name="NightShiftCount" onChange={handleChange} className="form-control" id="NightShiftCount" placeholder="NightShiftCount" min="0" required />
                                                              <label for="input" className="control-label">Night Shift</label>
                                                          </div>
                                                          <div className="mb-3 input-wrapper pb-2">
                                                              <input type="number" name="MorningShiftAmount" onChange={handleChange} className="form-control " id="MorningShiftAmount" placeholder="MorningShiftAmount" min="0" required />
                                                              <label for="input" className="control-label">Morning Shift Amount</label>
                                                          </div>
                                                          <div className="mb-3 input-wrapper pb-2">
                                                              <input type="number" name="NightShiftAmount" onChange={handleChange} className="form-control" id="NightShiftAmount" placeholder="NightShiftAmount" min="0" required />
                                                              <label for="input" className="control-label">Night Shift Amount</label>
                                                          </div>
                                                          <div className="mb-5 input-wrapper pb-2">
                                                              <button onClick={handlAddlabour} >Add labour</button>
                                                          </div>
                                                      </div>
                                                  </div>
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

);
};

export default Addlabour;
