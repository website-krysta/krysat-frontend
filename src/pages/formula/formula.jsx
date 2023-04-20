import "./formula.css"
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
// import { Link, useNavigate } from 'react-router-dom';


const Formula = () => {

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


  const [qtyData, setqtyData] = useState({})
const handleChange = (event) => {
    debugger;
    setqtyData({
...qtyData,
[event.target.name]: event.target.value
});
};


//   const [selectMaterial, setselectMaterial] = useState([]);
//   const getselectmaterialdata = async ()=>{
//     debugger;
//     for (let i = 0; i < checkedItems.length; i++) {
//         const materialId = checkedItems[i];
//         try{
//         let res = await axios.get(`/meterial/${materialId}/`);
//         setselectMaterial(res.data)
//         }
//         catch(error){
//         console.log(error)
//         }
//     }
//  };


  const now = new Date();
  let [materialData , setmaterialData] = useState([]);
  const getmaterialData = async ()=>{
     try{
      
      let res = await axios.get('api/meterial/list/');
      setmaterialData(res.data)
      console.log(materialData )
     }
     catch(error){
      console.log(error)
     }
  }
  
//   handleFormula
const [aFormula, setaFormula] = useState([]); 
const handleFormula = async (event) =>{
    debugger;
    event.preventDefault();
    const formulaObject = {
        materialiData:aMaterial,
        formulaname:qtyData
      };
      // Set the object as state
      setaFormula(formulaObject);
  try{
    debugger
    let res = await axios.post('api/formula/add/',formulaObject );
    // navigate('/users')
    alert('Formula adding sucessfully')
  }
  catch(error){
      alert('Formula adding fail please try agian !')
  }
}

  
  useEffect (()=>{
    getmaterialData();
    handleFormula();
    // getselectmaterialdata();
  },{})

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
                                  Add Formula
                              </div>
                              <div>
                                      <form className="labourform">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-12">
                                                  <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                      <input type="text"  name="FormulaName" onChange={handleChange}  className="form-control text-center" id="FormulaName" placeholder="Please Enter FormulaName" required />
                                                  </div>

                                                  <div className="show-material">
                                                    <div className="row">
                                                    
                                        {/* main logic */}

                                                {materialData.map((post)=>{         
                                                    return (
                                                <div className="col-2 p-3 px-5 material-tail">
                                                    <div className="material-item">
                                                        <div className="d-flex px-2 ">
                                                        <input type="checkbox" 
                                                        className="px-5" 
                                                        checked={checkedItems.includes(post.MaterialID)}
                                                        onChange={() => handleItemCheck(post.MaterialID,post.MaterialName)} 
                                                        // onChange={(event) => handleCheckboxChange(event, post.MaterialID)} 
                                                        id="{post.MaterialID}" 
                                                        name="{post.MaterialID}" 
                                                        value="{post.MaterialName}" />&nbsp;
                                                        <label for="vehicle1">{post.MaterialName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}

                                                {aMaterial.map((post)=>{  
                                                    let value = "dinesh"+12345       
                                                    return (
                                                        <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                            <label for="password">{post.materialname} :&nbsp;</label>
                                                            <input type="number"  name={post.materialid} onChange={handleChange}  className="form-control text-center" id="qty" placeholder="Material Qty"  />
                                                        </div>
                                                    )})}
                                                {/* ending logic */}

                                                    </div>
                                                  </div>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                    <button onClick={handleFormula} >Add</button>
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

export default Formula;
