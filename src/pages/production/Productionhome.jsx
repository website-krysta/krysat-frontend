
import "../production/production.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const ProductionHome = () => {

    const navigate = useNavigate();
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
    const minPercentage = Math.min(...filteredData.map((materialinfo) => ((materialinfo.material.TotalQuantity-materialinfo.material.ConsumedQuantity) / materialinfo.Quantity * 100)));
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
                                                <div className="formInput1  d-flex justify-content-center">
                                                {formulaData.FormulaID == "" ? <span></span> : <span className="maxqty px-5 pt-2">Maximum Possible Production Quantity is : {minPercentage <=0 ? 0:minPercentage.toFixed(2)+"(kg)"}</span> }
                                                </div>

                                                <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                    <input type="number"  name="ProductionQuantity" onChange={handleChange}  className="form-control text-center" id="FormulaName" placeholder="Please enter Required Quantity" min="0" required />
                                                </div>
                                                <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                    <input type="text" name="BatchNo"  onChange={handleChange} className="form-control text-center"  placeholder="Please enter Batch no" />
                                                </div>
                                                
                                                <div className="col-md-12">
                                                <table class="table mt-4">
                                                <thead>
                                                           <tr>
                                                             <th scope="col">MaterialName</th>
                                                             <th scope="col">Required Qty</th>
                                                             <th scope="col">Avaliable Qty</th>               
                                                             <th scope="col">Status</th>
                                                             {/* <th scope="col">maxPossibleQty</th> */}
                                                              
                                                           </tr>
                                                         </thead>
                                                    {filteredData.map((materialinfo) => (
                                                         <tbody>
                                                           <tr key={materialinfo.forumula.FormulaID}>
                                                             <td>{materialinfo.material.MaterialName}</td>
                                                             <td>{(materialinfo.Quantity/100)*formulaData.ProductionQuantity} ({materialinfo.Quantity} %)</td>
                                                             <td>{materialinfo.material.TotalQuantity-materialinfo.material.ConsumedQuantity} ({materialinfo.material.QtyType})</td>
                                                             <td>{(materialinfo.Quantity/100)*formulaData.ProductionQuantity > materialinfo.material.TotalQuantity-materialinfo.material.ConsumedQuantity ? (<p className="text-danger">Stock Not Avaliable</p>) :( <p className="text-success">Stock Avaliable</p>)}</td>
                                                        
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
