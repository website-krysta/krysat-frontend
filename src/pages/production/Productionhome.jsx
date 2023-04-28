
import "../production/production.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const ProductionHome = () => {

    const navigate = useNavigate();
    const [formulaData, setformulaData] = useState({
        RawMaterialID:''
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
    
    const fid = formulaData.RawMaterialID
    const [formulamaterialData, setformulamaterialData] = useState([])
    debugger;
        axios.get(`/api/formulamaterialiitems/${fid}/`)
        .then((res)=>{
            setformulamaterialData(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    


  
 


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
                                                    <input type="text"  name="FormulaName"   className="form-control text-center" id="FormulaName" placeholder="Please Enter FormulaName" required />
                                                </div>
                                                <div className="col-md-12 d-flex justify-content-center ">
                                                    <select  name='RawMaterialID' value={formulaData.ID} onChange={handleChange}  class="custom-select form-control text-center py-2 selectbox selectbox px-4" id="" >
                                                        <option>-- select Formula --  </option>
                                                        {options.map((option) => (
                                                            <option key={option.ID} value={option.ID}>{option.FormulaName}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-12">
                                                    <ul>
                                                    {formulamaterialData.map((materialinfo) => (
                                                            <li>{materialinfo.RawMaterialID} : {materialinfo.Quantity} %</li>
                                                        ))}
                                                    </ul>

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
