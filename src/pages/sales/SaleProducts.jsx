import "./sales.css"
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate ,useLocation } from 'react-router-dom';
// import Multiselect from 'multiselect-react-dropdown';
// import Select from 'react-select';

const SaleProducts = () => {
const salseinvoice = useLocation();
// const salseInvoiceData = salseinvoice.state && salseinvoice.state.data;
// const salseInvoiceData = salseinvoice.state.data
const navgate = useNavigate()
 const [checkedItems, setCheckedItems] = useState([]);  
 const [aMaterial, setaMaterial] = useState([]); 
  //  start main function
  const handleItemCheck = (itemId,avlqty,saleqty,itemName) => {
    // debugger;
    const listItems = [];
    for (let i = 0; i < aMaterial.length; i++) {
        const item_id = aMaterial[i].productId;
        listItems.push(item_id)
    }
    const isChecked = listItems.includes(itemId);
    if (isChecked) {
        setaMaterial(aMaterial => aMaterial.filter(item => item.productId !== itemId))
        setCheckedItems(prevCheckedItems => prevCheckedItems.filter(item => item !== itemId),itemName,avlqty,saleqty)
    
    } else {
        avlqty = avlqty-saleqty
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


const [checkedBatchno, setcheckedBatchno] = useState([]);  
  const [aBatch, setaBatch] = useState([]); 
const handlebatchCheck = (BatchNo,productname,productionqty,batchqty) =>{
   debugger;
   const listItems = [];
   for (let i = 0; i < aBatch.length; i++) {
       const item_id = aBatch[i].batchno;
       listItems.push(item_id)
   }
   const isChecked = listItems.includes(BatchNo);
   if (isChecked) {
    setaBatch(aBatch => aBatch.filter(item => item.batchno !== BatchNo))
       setcheckedBatchno(prevCheckedItems => prevCheckedItems.filter(item => item !== BatchNo),productname,productionqty,batchqty)
   
   } else {
       const batchObject = {
           batchno:BatchNo,
           productname:productname,
           productionQty:productionqty,
           batchQty:batchqty
         };
         // Set the object as state
         setaBatch([...aBatch, batchObject]);
       //   setoMaterial(materialObject);
       setcheckedBatchno(prevCheckedItems => [...prevCheckedItems, BatchNo,productname,productionqty,batchqty]);
   }
}

  const [formData, setFormData] = useState([]);
  const [qtyData, setqtyData] = useState({})
  
  const handleChange = (event) => {
        // debugger;
        setqtyData({
    ...qtyData,
    [event.target.name]: event.target.value
    });
};

  let [materialData , setmaterialData] = useState([]);
  const getmaterialData = async ()=>{
     try{
      
      let res = await axios.get('api/salesProducts/list/');
      setmaterialData(res.data)
     }
     catch(error){
      console.log(error)
     }
  }
  
  
  let [whitelabelingData , setwhitelabelingData] = useState([]);
  const getwhitelabelingData = async ()=>{
     try{
      
      let res = await axios.get('api/product/list/');
      setwhitelabelingData(res.data)
     }
     catch(error){
      console.log(error)
     }
  }

  // const [selectedBatchNumbers, setSelectedBatchNumbers] = useState([]);
  // const handleSelectChange = selectedOptions => {
  //   const newSelectedBatchNumbers = selectedOptions.map(option => option.value);
  //   setSelectedBatchNumbers(newSelectedBatchNumbers);
  //   // Handle the selected batch numbers as desired
  // };

  // let label_data = []
  // const handleSelectChange = selectedOptions => {
  //   debugger;
  //   if(selectedOptions.length > 1){
  //     selectedOptions = selectedOptions.filter(option => {
  //       return !label_data.some(existingOption => existingOption.value === option.value);
  //     });
  //   }
  //   selectedOptions.forEach(option => {
  //     const existingOptionIndex = label_data.findIndex(existingOption => existingOption.value === option.value);
  //     if (existingOptionIndex === -1) {
  //       // Option is newly selected
  //       label_data.push({
  //         value: option.value,
  //         product: option.product
  //       });
  //     } else {
  //       // Option is deselected, remove it from the list
  //       label_data.splice(existingOptionIndex, 1);
  //     }
  //   }); 
  // };

//   handleProductSales
const salseInvoiceData = salseinvoice.state && salseinvoice.state.data;
const [aFormula, setaFormula] = useState([]); 
const  handleProductSales = async (event) =>{
    // debugger; 
    event.preventDefault();
    const formulaObject = {
        productIdata:aMaterial,
        productioninfo:formData,
        salsedata:salseInvoiceData,
        batch_info:aBatch,
      };
      // Set the object as state
      setaFormula(formulaObject);
    
  try{
    // debugger
    let res = await axios.post('api/sales/add/',formulaObject );
    alert('Products Sales Sucessfully !')
    navgate('/sales/')
    
  }
  catch(error){
      alert('sale products adding fail please try agian !')
  }
}

let [productionData , setproductionData] = useState([]);
const handleproductChange = (event) => {
    debugger;
    setproductionData({
      ...productionData,
      [event.target.name]: event.target.value
    });
  };

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

  const [prname, setprName] = useState({})
  const handleProductChange = (event) => {
        // debugger;
        setprName({
    ...prname,
    [event.target.name]: event.target.value
    });
};


const [poptions, setpOptions] = useState([]);
const getproductdata = async ()=>{
  try{
    debugger
   let res = await  axios.get('api/productionTable_ViewSet/');
   setpOptions(res.data)
  }
  catch(error){
   console.log(error)
  }
}




  useEffect (()=>{
    getmaterialData();
    handleProductSales();
    getwhitelabelingData();
    getproductdata();
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
                                                        checked={checkedItems.includes(post.FormulaID)}
                                                        onChange={() => handleItemCheck(post.FormulaID,post.TotalProductionQty,post.TotalSaledQty,post.FormulaName)}                                            
                                                        id="{post.FormulaID}" 
                                                        name="{post.FormulaID}" 
                                                        value="{post.FormulaName}" />&nbsp;
                                                        <label >{post.FormulaName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}
                                                <br/>
                                                {whitelabelingData.map((post)=>{         
                                                    return (
                                                <div className="col-2 p-3 px-5 material-tail">
                                                    <div className="material-item">
                                                        <div className="d-flex px-2 ">
                                                        <input type="checkbox" 
                                                        className="px-5" 
                                                        checked={checkedItems.includes(post.ProductID)}
                                                        onChange={() => handleItemCheck(post.ProductID,post.TotalQuantity,post.ConsumedQuantity,post.ProductName)}                                            
                                                        id="{post.ProductID}" 
                                                        name="{post.ProductID}" 
                                                        value="{post.whitelabelingData}" />&nbsp;
                                                        <label >{post.ProductName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}


                                                {aMaterial.map((post,index)=>{  
                                                    return (
                                                        <div className="row salesinputs" key={index}>
                                                            <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                                <div class="col-2 text-end">
                                                                    <label value={post.productname} onchange={handleProductChange}>{post.productname} :&nbsp;</label>
                                                                </div>
                                                                <div class="col-0 input-group input-size">
                                                                    <input type="number" name={post.productId} 
                                                                    value={formData[index]?.price || ''}
                                                                    onChange={(e) => handlePriceChange(e, index)}  className="form-control text-center"  min="0" id="amount" placeholder="Enter Amount"  />
                                                                    <span class="input-group-text" id="basic-addon2">₹</span>
                                                                </div>&nbsp;&nbsp;
                                                                <div class="col-0 input-group input-size">
                                                                    <input type="number"name={post.productId+1}
                                                                        value={formData[index]?.quantity || ''}
                                                                        onChange={(e) => handleQuantityChange(e, index)}  className="form-control text-center"  min="0" id="qty" placeholder="Enter Quantity"  />
                                                                    <span class="input-group-text" id="basic-addon2">{post.avaQty <=0? 0:post.avaQty}</span>
                                                                </div>&nbsp;&nbsp;
                                                                <div class="input-group input-size batchnum-sec">
                                                                {poptions
                                                                    .filter(
                                                                      (boption) =>
                                                                        boption.forumula.FormulaName === post.productname &&
                                                                        parseFloat(boption.ProductionQuantity-boption.BatchQty) !== 0
                                                                    )
                                                                    .map((option) => (
                                                                      <div key={option.BatchNo} className="col-3 pt-1 px-5 material-tail">
                                                                        <div className="material-item">
                                                                          <div className="d-flex px-2">
                                                                            <input
                                                                              type="checkbox"
                                                                              className="px-5"
                                                                              // checked={checkedBatchno.includes(option.BatchNo)}
                                                                              onChange={() => handlebatchCheck(option.BatchNo, option.forumula.FormulaID,option.ProductionQuantity, option.BatchQty)}
                                                                              id={option.BatchNo}
                                                                              name={option.BatchNo}
                                                                              value={option.BatchNo}
                                                                            />
                                                                            <label>&nbsp;{option.BatchNo}|<span className="avl_qty">{option.ProductionQuantity-option.BatchQty}</span></label>
                                                                            <br />
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    ))}
                                                                                                                                  {/* <Select
                                                                  options={poptions.filter(boption => boption.forumula.FormulaName === post.productname && parseFloat(boption.ProductionQuantity) !== 0)
                                                                  .map(boption => ({ value: boption.BatchNo, label: boption.BatchNo,product:post.productname,productid:post.productId}))
                                                                  }
                                                                  isMulti                                                            
                                                                  // value={label_data.map(batchNo => ({ value: batchNo, label: batchNo }))}
                                                                  onChange={handleSelectChange}
                                                                /> */}


                                                                    
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
