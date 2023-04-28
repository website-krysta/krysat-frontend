// import "./product.scss";
import { Link ,useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AddIcon from '@mui/icons-material/Add';

// import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Materialstock = () => {

  const navigate = useNavigate();
  let [mstockData , setmstockData] = useState([]);
  const getmaterialstock = async ()=>{
    try{
     
     let res = await axios.get('api/meterial/list/');
     setmstockData(res.data)
    }
    catch(error){
     console.log(error)
    }
 }
  


  useEffect(() =>{
    getmaterialstock();
  },{});

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Raw Material Stock
        {/* <Link to="/invoice/addinvoice" className="link px-3"><AddIcon/>Add Invoice</Link> */}
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">MaterialCode</th>
                <th scope="col">MaterialName</th>
                <th scope="col">QtyType</th>
                <th scope="col">Available Qty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {mstockData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.MaterialID}>
                <td>{post.MaterialCode}</td>
                <td>{post.MaterialName}</td>
                <td>{post.QtyType}</td>
                <td>{post.TotalQuantity-post.ConsumedQuantity}</td>
                <td>
                  <button
                    onClick={() => navigate(`/stock/materiallist/${post.MaterialID}`)}
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

export default Materialstock;
