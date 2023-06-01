
import "../production/production.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const ProductionHome = () => {

    const navigate = useNavigate();
    const [selectedQtyType, setSelectedQtyType] = useState('');
    const [formulaData, setformulaData] = useState({
        ProductionID:'',
        FormulaID: '', 
        TransactionDate:'',  
        ProductionQuantity:'',
        BatchNo:'',
        AddedTimeStamp:'',
        UpdatedTimeStamp:''
    });
    


    const handleChange = (event) => {
        setformulaData({
        ...formulaData,
        [event.target.name]: event.target.value,
        
      });
    };
    
  


    const [options, setOptions] = useState([]);
    const getformulaData = async ()=>{
        
      try{
        let res = await axios.get('api/formula/list/');
        setOptions(res.data)
       
      }
      catch(error){
        console.log(error)
      }
    }
    
    const fid = formulaData.FormulaID
    const [formulamaterialData, setformulamaterialData] = useState([])
    const [prevProductionData , setprevProductionData] = useState([])

    const filteredData = formulamaterialData.filter(obj => obj.forumula.FormulaID === parseInt(fid));
    const result = filteredData.find(item => (item.Quantity/100)*formulaData.ProductionQuantity >= item.material.TotalQuantity);
    // maximum production Possible
    debugger;
    const minPercentage = Math.min(...filteredData.map((materialinfo) => (
        
        (materialinfo.material.QtyType !== selectedQtyType ? 
            (
                ((((materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity) *
                (selectedQtyType === 'liters' ? 0.9708: selectedQtyType !== 'liters' ? 0.9708:1)) / materialinfo.Quantity) * 100)
            ) : 
            (
                (((materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity) / materialinfo.Quantity )* 100)
             ))
            
        // (materialinfo.material.QtyType !== "liters" ? ((materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity) * 0.9708) / materialinfo.Quantity * 100 : ((materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity)) / materialinfo.Quantity * 100)
       //(materialinfo.material.QtyType ==="liters" ? (materialinfo.material.TotalQuantity-materialinfo.material.ConsumedQuantity/0.9708) / materialinfo.Quantity * 100):(materialinfo.material.TotalQuantity-materialinfo.material.ConsumedQuantity) / materialinfo.Quantity * 100))
        )));
    // debugger; 
   const getjointabledata = async () => {
    try{
        let res = await axios.get('api/formulaviewSet/')
        setformulamaterialData(res.data)
    }
    catch(error){
        console.log(error)
    }
    }

    const getproductionData = async () => {
        try{
            debugger
            let res = await axios.get('api/production/list/')
            setprevProductionData(res.data)
        }
        catch(error){
            console.log(error)
        }
    }
    
    const maxProductionID = prevProductionData.reduce((max, production) => {
        if (production.ProductionID > max) {
            return production.ProductionID;
        } else {
            return max;
        }

    }, 0);  

    const newProduct = { 
        ProductionID:(maxProductionID+1).toString(),
        FormulaID: formulaData.FormulaID, 
        TransactionDate:formulaData.TransactionDate,
        ProductionQuantity:formulaData.ProductionQuantity,
        BatchNo:formulaData.BatchNo,
        AddedTimeStamp:formulaData.AddedTimeStamp,
        UpdatedTimeStamp:formulaData.UpdatedTimeStamp,
    }
    const handleproduction = async (event) => {
        event.preventDefault();
       
        try{
        debugger;
        let res = await axios.post('api/production/add/',newProduct );
        navigate('/production/packingproduct',{state:{data:newProduct}})
  
        }
        catch(error){
            alert('Oops! Unable to Create production . Please check the provided details and try again later.')
        }
    }


    const handleQtyTypeChange = (event) => {
        const { value } = event.target;
        setSelectedQtyType(value);
      };
  
  
 


    useEffect(() => {
        getformulaData();
        getjointabledata();
        getproductionData();
        handleproduction();
       

    }, {});

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
                                Production 
                                </div>
                                <form className="labourform">
                                        <div className="row">
                                            <h1 className="text-center text-primary pt-4"></h1>
                                            <div className="col-md-12">
                                                 
                                                <div className="col-md-12 d-flex justify-content-center ">
                                                    <select  name='FormulaID' value={formulaData.FormulaID} onChange={handleChange}  class="custom-select form-control text-center py-2 selectbox selectbox px-4" id="" >
                                                        <option>-- select Formula --  </option>
                                                        {options.map((option) => (
                                                            <option key={option.FormulaID} value={option.FormulaID}>{option.FormulaName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                               
                                                <div className="productionqty  d-flex justify-content-center">
 
                                                    <div className="col-4  mb-2 mt-2 d-flex justify-content-center ">
                                                        <input type="number" name="ProductionQuantity" onChange={handleChange} className="form-control text-center" id="reqqty" placeholder="Please enter Required Quantity" min="0" required />
                                                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <div class="col-2  mb-2 mt-2  d-flex justify-content-center">
                                                        <select class="form-select" value={selectedQtyType} onChange={handleQtyTypeChange} className="form-control text-center" id="qtytype" aria-label="Example select with button addon">
                                                            <option value="">Select Quantity Type</option>
                                                            <option value="kg">kg</option>
                                                            <option value="liters">liters</option>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="row formInput1  d-flex justify-content-center">
                                                {formulaData.FormulaID == "" ? <span></span> : <span className="maxqty text-center  pt-2">Maximum Possible Production Quantity is : {minPercentage <=0 ? 0:minPercentage.toFixed(2)} ({selectedQtyType})</span> }
                                                </div>
                                                <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                    <input type="text" name="BatchNo"  onChange={handleChange} className="form-control text-center"  placeholder="Please enter Batch no" />
                                                </div>
                                                
                                                <div className="col-md-12">
                                                <table class="table mt-4">
                                                <thead>
                                                           <tr>
                                                             <th scope="col">MaterialName</th>
                                                             <th scope="col">Required Qty({selectedQtyType})</th>
                                                             <th scope="col">Avaliable Qty({selectedQtyType})</th>               
                                                             <th scope="col">Status</th>
                                                             {/* <th scope="col">maxPossibleQty</th> */}
                                                              
                                                           </tr>
                                                         </thead>
                                                    {filteredData.map((materialinfo) => (
                                                         <tbody>
                                                           <tr key={materialinfo.forumula.FormulaID}>
                                                             <td>{materialinfo.material.MaterialName}</td>
                                                             <td>{((materialinfo.Quantity/100)*(selectedQtyType === 'liters' ? formulaData.ProductionQuantity*0.9708:formulaData.ProductionQuantity )).toFixed(2)} ({materialinfo.Quantity} %)</td>
                                                             <td>  
                                                                    {materialinfo.material.QtyType !== selectedQtyType ? 
                                                                    (
                                                                        (materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity) *
                                                                        (selectedQtyType === 'liters' ? 0.9708: selectedQtyType !== 'liters' ? 0.9708:1)
                                                                    ) : 
                                                                    (
                                                                        materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity 
                                                        
                                                                     )
                                                                    }
                                                                    </td>
                                                             <td>{(materialinfo.Quantity/100)*formulaData.ProductionQuantity >  (materialinfo.material.QtyType !== selectedQtyType ? 
                                                                    (
                                                                        (materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity) *
                                                                        (selectedQtyType === 'liters' ? 0.9708: selectedQtyType !== 'liters' ? 0.9708:1)
                                                                    ) : 
                                                                    (
                                                                        materialinfo.material.TotalQuantity - materialinfo.material.ConsumedQuantity 
                                                        
                                                                     )
                                                                    ) ? (<p className="text-danger">Stock Not Avaliable</p>) :( <p className="text-success">Stock Avaliable</p>)}</td>
                                                        
                                                           </tr>
                                                         </tbody>

                                                        ))}
                                                     </table>

                                                </div>
                                                {result ? (
                                                        <div className="d-flex justify-content-center">
                                                        <div>
                                                        {/* Maximum Possible Production Quantity is : {minPercentage} */}
                                                        </div>
                                                    </div>
                                                    ) : (
                                                        <div className="d-flex justify-content-center">
                                                        <div>
                                                            <button onClick={handleproduction}>Next</button>
                                                        </div>
                                                    </div>
                                                    )}
                                                                                                
                                                
          
                                            </div>

                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};
export default ProductionHome;
