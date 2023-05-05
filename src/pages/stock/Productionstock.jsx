
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
     
     let res = await axios.get('api/production/list/');
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
                <th scope="col">TransationDate</th>
                <th scope="col">FormulaID</th>
                <th scope="col">ProductionQuantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {mstockData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.PackingMaterialID}>
                <td>{format(new Date(post.TransactionDate), 'dd-MM-yyyy')}</td>
                <td>{post.FormulaID}</td>
                <td>{post.ProductionQuantity}</td>
                
               
                <td><button
                    onClick={() => navigate(`/stock/packinglist/${post.PackingMaterialID}`)}
                    className='btn btn-warning'>Details
                  </button>
                </td>
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
