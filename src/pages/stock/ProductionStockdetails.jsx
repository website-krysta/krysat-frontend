
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "../../api/axios";
import { Link,useParams,useNavigate } from 'react-router-dom';


const ProductionStockdetails = () => {

  const navigate = useNavigate();
  const { productionId } = useParams();
  // let [selectedData ,setselectedData] = useState([]);
  const [mstockData , setmstockData] = useState([]);


  const getpackingstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/production_packingTable_ViewSet/');
      setmstockData(res.data) 
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = mstockData.filter(obj => obj.producton.ProductionID ===parseInt(productionId));


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
        Packing Stock list
  
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
               
                <th scope="col">Product Name</th>
                <th scope="col">Date </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {filteredData.map((post)=>{
                 return (
                   <tbody>
                     <tr key={post.producton.ProductionID}>
                       <td>{post.forumula.FormulaName}</td>

                     </tr>
                   </tbody>
            );
            })}
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
