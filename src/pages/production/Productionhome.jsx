
import "../production/production.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const ProductionHome = () => {

    const navigate = useNavigate();
    const [formulaData, setformulaData] = useState({
        FormulaID:''
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
    debugger;
    axios.get('api/formulaviewSet/')
    .then((res)=>{
        setformulamaterialData(res.data)
    }).catch((error)=>{
        console.log(error)
    })


    const filteredData = formulamaterialData.filter(obj => obj.forumula.FormulaID === parseInt(fid));
       
    // axios.get(`/api/formulamaterialiitems/${fid}/`)
        // .then((res)=>{
        //     setformulamaterialData(res.data)
        // }).catch((error)=>{
        //     console.log(error)
        // })
    


  
 


    useEffect(() => {
        getformulaData();

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
                                    Add Formula
                                </div>
                                <form className="labourform">
                                        <div className="row">
                                            <h1 className="text-center text-primary pt-4"></h1>
                                            <div className="col-md-12">
                                                <div className="formInput1 mb-3 mt-2 d-flex justify-content-center">
                                                    <input type="text"  name="FormulaName"   className="form-control text-center" id="FormulaName" placeholder="Please Required Qty" required />
                                                </div>
                                                <div className="col-md-12 d-flex justify-content-center ">
                                                    <select  name='FormulaID' value={formulaData.FormulaID} onChange={handleChange}  class="custom-select form-control text-center py-2 selectbox selectbox px-4" id="" >
                                                        <option>-- select Formula --  </option>
                                                        {options.map((option) => (
                                                            <option key={option.FormulaID} value={option.FormulaID}>{option.FormulaName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-12">
                                                <table class="table mt-4">
                                                <thead>
                                                           <tr>
                                                             <th scope="col">MaterialName</th>
                                                             <th scope="col">Required Qty</th>
                                                             <th scope="col">Avaliable Qty</th>
                                                             <th scope="col">Status</th>
                                                           </tr>
                                                         </thead>
                                                    {filteredData.map((materialinfo) => (
                                                        
                                                         
                                        
                                                         <tbody>
                                                           <tr key={materialinfo.forumula.FormulaID}>
                                                             <td>{materialinfo.material.MaterialName}</td>
                                                             <td>{materialinfo.Quantity} %</td>
                                                             {/* <td>{materialinfo.material.MaterialName}</td> */}
                                                             <td>{materialinfo.material.TotalQuantity} %</td>
                                                             <td>{materialinfo.Quantity >= materialinfo.material.TotalQuantity ? (<p className="text-danger">Stock Not Avaliable</p>) :( <p className="text-success">Stock Avaliable</p>)}</td>
                                                             
                                                           </tr>
                                                         </tbody>
                                                        
                                                    
                                                            // <li>{materialinfo.material.MaterialName} : {materialinfo.Quantity} %  --- {materialinfo.material.MaterialName} : {materialinfo.material.TotalQuantity} %</li>
                                                        ))}
                                                     </table>

                                                </div>
                                                
                                        
                                              <div className="d-flex justify-content-center">
                                                    <div>
                                                        <button >Next</button>
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
    );
    
};
export default ProductionHome;
