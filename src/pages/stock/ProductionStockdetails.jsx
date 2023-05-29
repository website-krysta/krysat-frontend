
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "../../api/axios";
import { Link,useParams,useNavigate } from 'react-router-dom';


const ProductionStockdetails = () => {

  const navigate = useNavigate();
  const { formulaid } = useParams();
  // let [selectedData ,setselectedData] = useState([]);
  const [mstockData , setmstockData] = useState([]);


  const getpackingstock = async ()=>{
    try{
     debugger;
      let res = await axios.get('api/productioninfo_view/');
      setmstockData(res.data) 
    //  let res = await axios.get('api/production_packingTable_ViewSet/');
    
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = mstockData.filter(obj => obj.FormulaID === parseInt(formulaid));
    const displayFormulalist = filteredData
    .map(post => (
      <tr key={post.id}>
        <td>{post.ProductionQuantity}</td>
        <td>{post.BatchNo}</td>
        <td>{format(new Date(post.AddedTimeStamp), 'dd-MM-yyyy')}</td>
        {/* <td>
          {post.production_material.map((material, index) => (
            <span key={index} className="material-name">
              {material.Material_info.MaterialName}{","}
            </span>
          ))}
        </td> */}
       
      </tr>
    ));

 useEffect(() =>{
  getpackingstock();
},[]);

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
                 Production stock details
                </div>
                <div>
                  <div className="main">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">ProductionQuantity </th>
                          <th scope="col">BatchNo </th>
                          <th scope="col">Production Date </th>
                        </tr>
                      </thead>
                      <tbody>
                      {displayFormulalist}
                      </tbody>
                      {/* {filteredData.map((post) => {
                        return (
                          <tbody>
                            <tr key={post.ProductionID}>
                              <td>{post.ProductionQuantity}</td>
                              <td>
                                  {post.production_material.map((material, index) => (
                                            <span key={index} className="material-name">
                                              {material}
                                            </span>
                                          ))}
                              </td>
                              <td>{post.AddedTimeStamp}</td>
                              
                              
                            
                            </tr>
                          </tbody>
                        );
                      })} */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionStockdetails;
