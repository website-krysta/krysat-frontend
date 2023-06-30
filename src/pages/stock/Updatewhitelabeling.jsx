
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CreateIcon from '@mui/icons-material/Create';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import axios from "../../api/axios";
import {useParams,useNavigate } from 'react-router-dom';


const Updatewhitelabeling = () => {

  const navigate = useNavigate();
  const { ProductID } = useParams();
  // let [selectedData ,setselectedData] = useState([]);
  const [mstockData , setmstockData] = useState([]);


  const getproductionstock = async ()=>{
    try{
     debugger;
     let res = await axios.get('/api/WhitelabelingViewSet/');
      setmstockData(res.data) 
    }
    catch(error){
     console.log(error)
    }

    }
      
    const filteredData = mstockData.filter(obj => obj.ProductID ===parseInt(ProductID));


 useEffect(() =>{
  getproductionstock();
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
       White Labeling Stock list
  
      </div>
     
      <div>
        <div className="main">
        <table class="table">
            <thead>
              <tr>
               
                <th scope="col">WhiteLabeling Name</th>
                <th scope="col">WhiteLabeling Code</th>
                <th scope="col">Batch No</th>
                <th scope="col">QtyType</th>
                <th scope="col">Purchaged Qty</th>
                <th scope="col">Recived Qty</th>
                <th scope="col">VendorName</th>
                <th scope="col">DamagedQty </th>
                <th scope="col">InvoiceNumber </th>
                <th scope="col">Date </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {filteredData.map((post)=>{
                 return (
            <tbody>
              <tr key={post.Id}>
                <td>{post.Production.ProductName}</td>
                <td>{post.Production.ProductCode}</td>
                <td>{post.BatchNo}</td>
                <td>{post.Production.QtyType}</td>
                <td>{post.OrderedQuantity}</td>
                <td>{post.ReceivedQuantity}</td>
                <td>{post.Vendor.VendorName}</td>
                <td>{post.Damaged.DamagedQty}</td>
                <td>{post.invoice.InvoiceNumber}</td>
                {format(new Date(post.AddedTimestamp), 'dd-MM-yyyy')}
                <td>
                <div className="actions-btns useraction-btns">
                      <div onClick={() => navigate(`/stock/updateWhitelabel/${post.Id}`)}
                    className='view'><CreateIcon/>

                      </div>
                  </div>
                  {/* <button
                    onClick={() => navigate(`/stock/updateWhitelabel/${post.Id}`)}
                    className='btn btn-warning'>Edit
                  </button> */}
                </td>
              </tr>
            </tbody>);
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

export default Updatewhitelabeling;
