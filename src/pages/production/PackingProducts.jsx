// import "./formula.css"
// import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate,useLocation } from 'react-router-dom';


const Packingproduct = (props) => {
const productionifo = useLocation();
const navigate = useNavigate();
 const [checkedItems, setCheckedItems] = useState([]);  
 const [aMaterial, setaMaterial] = useState([]); 
  //  start main function
  const handleItemCheck = (itemId,itemName,totqty,ConsumeQty) => {
    debugger;
    const listItems = [];
    for (let i = 0; i < aMaterial.length; i++) {
        const item_id = aMaterial[i].PackingMaterialID;
        listItems.push(item_id)
    }
    const isChecked = listItems.includes(itemId);
    if (isChecked) {
        setaMaterial(aMaterial => aMaterial.filter(item => item.PackingMaterialID !== itemId))
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemId),itemName)
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemId),totqty,ConsumeQty)
    
    } else {
        totqty = totqty-ConsumeQty
        const materialObject = {
            PackingMaterialID:itemId,
            PackingMaterialName:itemName,
            PackingtotQty:totqty
          };
          // Set the object as state
          setaMaterial([...aMaterial, materialObject]);
        //   setoMaterial(materialObject);
        setCheckedItems(prevCheckedItems => [...prevCheckedItems, itemId,itemName,totqty]);
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




  const now = new Date();
  let [materialData , setmaterialData] = useState([]);
  const getmaterialData = async ()=>{
     try{
      debugger
      let res = await axios.get('api/packing/list/');
      setmaterialData(res.data)
      console.log(materialData )
     }
     catch(error){
      console.log(error)
     }
  }
  
//   handleProduction
const productionData = productionifo.state.data
// JSON.parse(localStorage.getItem('production'));
const [aPackingData, setaPackingData] = useState([]); 
const  handleProduction = async (event) =>{
    debugger;
    event.preventDefault();
    const packing_Object = {
        PackingMaterialIData:aMaterial,
        packingQty:qtyData,
        productionData:productionData
      };

      try{
        debugger
        let res = await axios.post('api/production/packingadd/', packing_Object );
        alert("Product packing completed successfully! The items have been packed and are ready for Sale.")
        navigate('/production/')
      }
      catch(error){
          alert("Oops! Unable to complete product packing. Please check the items and try again later.")
      }


}

  
  useEffect (()=>{
    getmaterialData();
    handleProduction();
   
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
                                  Packing List
                              </div>
                              <div>
                                      <form className="labourform">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-12">
                                                  <div className="show-material">
                                                    <div className="row">
                                                    
                                        {/* main logic */}

                                                {materialData.map((post)=>{         
                                                    return (
                                                <div className="col-3 p-3 px-5 material-tail">
                                                    <div className="material-item">
                                                        <div className="d-flex px-2 ">
                                                        <input type="checkbox" 
                                                        className="px-5" 
                                                        checked={checkedItems.includes(post.PackingMaterialID)}
                                                        onChange={() => handleItemCheck(post.PackingMaterialID,post.PackingMaterialName,post.TotalQuantity,post.ConsumedQuantity
                                                            )} 
                                                        
                                                        id="{post.PackingMaterialID}" 
                                                        name="{post.PackingMaterialID}" 
                                                        value="{post.PackingMaterialName}" />&nbsp;&nbsp;
                                                        <label for="vehicle1">{post.PackingMaterialName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}

                                                {aMaterial.map((post)=>{ 
                                                    // const selectedMaterial = materialData.find((item) => item.forumula.PackingMaterialID === post.PackingMaterialID)   
                                                    return (
                                                        <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                            <div class="col-3 text-end">
                                                            <label for="password">{post.PackingMaterialName} :&nbsp;</label>
                                                            </div>
                                                            <div class="col-5">
                                                            <input type="number"  name={post.PackingMaterialID} onChange={handleChange}  className="form-control text-center"  min="0" id="qty" placeholder="Please Enter Material Qty"  />
                                                            </div>
                                                            <div class="col-4 text-end">
                                                            <label for="password">{post.PackingtotQty} &nbsp;&nbsp;&nbsp;</label>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                    )})}
                                               

                                                    </div>
                                                  </div>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                    <button onClick={handleProduction} >Add Production</button>
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

export default Packingproduct;
