import "./formula.css"
import "../labour/labour.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from 'react-router-dom';


const Formula = () => {

 const navigate = useNavigate();
  

  //  start main function
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (event, itemId) => {
    debugger
    setCheckedItems({
      ...checkedItems,
      [itemId]: event.target.checked
    });
  };

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
  
  
  useEffect (()=>{
    getmaterialData();
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
                                                      <input type="text"  name="FormulaName"  className="form-control text-center" id="FormulaName" placeholder="Please Enter FormulaName" required />
                                                  </div>

                                                  <div className="show-material">
                                                    <div className="row">
                                                    
                                        {/* main logic */}

                                                {materialData.map((post)=>{         
                                                    return (
                                                <div className="col-2 p-3 px-5 material-tail">
                                                    <div className="material-item">
                                                        <div className="d-flex px-2 ">
                                                        <input type="checkbox" className="px-5" onChange={(event) => handleCheckboxChange(event, post.MaterialID)} id="{post.MaterialID}" name="{post.MaterialID}" value="{post.MaterialID}" />&nbsp;
                                                        <label for="vehicle1">{post.MaterialName}</label><br></br>
                                                        </div>
                                                    </div>
                                                    
                                                </div>);
                                                })}

                                        {/* ending logic */}


                                                    </div>
                                                  </div>
                                                <div className="d-flex justify-content-center">
                                                    <div>
                                                    <button onClick="" >Add</button>
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
