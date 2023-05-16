
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Productionstock = () => {
  
  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getProductionstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('api/productionTable_ViewSet/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  


  useEffect(() =>{
    getProductionstock();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
      Production Stock
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Product Name </th>
                <th scope="col">Production Qty</th>
                <th scope="col">Production Date</th>
                {/* <th scope="col">Actions</th> */}
              </tr>
            </thead>
            {mstockData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.ProductionID}>
                <td>{post.forumula.FormulaName}</td>
                <td>{post.ProductionQuantity}</td>
                <td>{format(new Date(post.AddedTimeStamp), 'dd-MM-yyyy')}</td>
                
               
                {/* <td><button
                    onClick={() => navigate(`/stock/production/${post.ProductionID}`)}
                    className='btn btn-warning'>Details
                  </button>
                </td> */}
              </tr>
            </tbody>);
            })}
        </table>
        </div>
      </div>
    

    </div>
  );
};

export default Productionstock;
