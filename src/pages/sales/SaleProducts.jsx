import "./sales.css"
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate ,useLocation } from 'react-router-dom';


const SaleProducts = () => {
const salseinvoice = useLocation();
// const salseInvoiceData = salseinvoice.state && salseinvoice.state.data;
// const salseInvoiceData = salseinvoice.state.data
const navgate = useNavigate()
 const [checkedItems, setCheckedItems] = useState([]);  
 const [aMaterial, setaMaterial] = useState([]); 
  //  start main function
  const handleItemCheck = (itemId,avlqty,itemName) => {
    debugger;
    const listItems = [];
    for (let i = 0; i < aMaterial.length; i++) {
        const item_id = aMaterial[i].productId;
        listItems.push(item_id)
    }
    const isChecked = listItems.includes(itemId);
    if (isChecked) {
        setaMaterial(aMaterial => aMaterial.filter(item => item.productId !== itemId))
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemId),itemName,avlqty)
    
    } else {
        
        const materialObject = {
            productId:itemId,
            productname:itemName,
            avaQty:avlqty
          };
          // Set the object as state
          setaMaterial([...aMaterial, materialObject]);
        //   setoMaterial(materialObject);
        setCheckedItems(prevCheckedItems => [...prevCheckedItems, itemId,itemName]);
    }
  };

  const [formData, setFormData] = useState([]);
  const [qtyData, setqtyData] = useState({})
  
  const handleChange = (event) => {
        debugger;
        setqtyData({
    ...qtyData,
    [event.target.name]: event.target.value
    });
};

  let [materialData , setmaterialData] = useState([]);
  const getmaterialData = async ()=>{
     try{
      
      let res = await axios.get('api/productionTable_ViewSet/');
      setmaterialData(res.data)
     }
     catch(error){
      console.log(error)
     }
  }
  
//   handleProductSales
const salseInvoiceData = salseinvoice.state && salseinvoice.state.data;
const [aFormula, setaFormula] = useState([]); 
const  handleProductSales = async (event) =>{
    debugger; 
    event.preventDefault();
    const formulaObject = {
        productIdata:aMaterial,
        productioninfo:formData,
        salsedata:salseInvoiceData
      };
      // Set the object as state
      setaFormula(formulaObject);
    
  try{
    debugger
    let res = await axios.post('api/sales/add/',formulaObject );
    alert('Products Sales Sucessfully !')
    navgate('/sales/')
    
  }
  catch(error){
      alert('sale products adding fail please try agian !')
  }
}


const handlePriceChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        price: value,
      };
      return updatedData;
    });
  };
  
  const handleQuantityChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        quantity: value,
      };
      return updatedData;
    });
  };
  
  useEffect (()=>{
    getmaterialData();
    handleProductSales();
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
                                Sale Products
                              </div>
                              <div>
                                      <form className="productSales">
                                          <div class="row">
                                              <h1 className="text-center text-primary pt-4"></h1>
                                              <div className="col-md-12">
                                                  <div className="show-material">
                                                <div className="row">
                                                    
                        

                                                {materialData.map((post)=>{         
                                                    return (
                                                <div className="col-2 p-3 px-5 material-tail">
                                                    <div className="material-item">
                                                        <div className="d-flex px-2 ">
                                                        <input type="checkbox" 
                                                        className="px-5" 
                                                        checked={checkedItems.includes(post.ProductionID)}
                                                        onChange={() => handleItemCheck(post.ProductionID,post.ProductionQuantity,post.forumula.FormulaName)}                                            
                                                        id="{post.ProductionID}" 
                                                        name="{post.ProductionID}" 
                                                        value="{post.forumula.FormulaName}" />&nbsp;
                                                        <label >{post.forumula.FormulaName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}

                                                {aMaterial.map((post,index)=>{  
                                                    return (
                                                        <div className="row" key={index}>
                                                            <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                                <div class="col-2 text-end">
                                                                    <label>{post.productname} :&nbsp;</label>
                                                                </div>
                                                                <div class="col-0 input-group">
                                                                    <input type="number" name={post.productId} 
                                                                    value={formData[index]?.price || ''}
                                                                    onChange={(e) => handlePriceChange(e, index)}  className="form-control text-center"  min="0" id="amount" placeholder="Please Enter Amount ₹ "  />
                                                                    <span class="input-group-text" id="basic-addon2">₹</span>
                                                                </div>&nbsp;&nbsp;
                                                                <div class="col-0 input-group">
                                                                    <input type="number"name={post.productId+1}
                                                                        value={formData[index]?.quantity || ''}
                                                                        onChange={(e) => handleQuantityChange(e, index)}  className="form-control text-center"  min="0" id="qty" placeholder="Please Enter Quantity "  />
                                                                    <span class="input-group-text" id="basic-addon2">{post.avaQty}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )})}
                                                {/* ending logic */}

                                                    </div>
                                                  </div>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                    <button onClick={handleProductSales} >Add</button>
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

export default SaleProducts;
